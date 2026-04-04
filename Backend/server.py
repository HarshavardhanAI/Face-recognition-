from flask import Flask,jsonify,request
from flask_cors import CORS
import cv2 as cv
import numpy as np
from retinaface import RetinaFace
from keras_facenet import FaceNet
import pinecone
import uuid
import cloundinary
import cloundinary.uploader

# flask configurations 
app = Flask(__name__)
CORS(app)

# facenet configuration
embedder = FaceNet()

#pinecone configuration 
pinecone.init(api_key=os.getenv("PINECONE_API"),environment="us-east-1")
index = pinecone.Index("face-recongition")

# cloundinary config 
cloudinary.config(
    cloud_name="CLOUDINARY_CLOUD_NAME",
    api_key="CLOUDINARY_API_KEY",
    api_secret="CLOUDINARY_API_SECRET"
)

@app.route("/")
def home():
    return jsonify({"message":"hello world"})

@app.route("/addperson",methods=["POST"])
def add_person():
    name = request.form.get("name")
    file = request.files.get("image")

    # Convert to OpenCV image
    file_bytes = file.read()
    np_arr = np.frombuffer(file_bytes, np.uint8)
    img = cv.imdecode(np_arr, cv.IMREAD_COLOR)
    
    # face detection 
    faces = RetinaFace.detect_faces(img)
    
    if len(faces) ==0:
        return jsonify({"status":"no face","message":"no face is detected"})

    if len(faces) >1:
        return jsonify({"status":"multiple faces","message":"more than one face is in image"})

    face = faces["face_1"]
    if face["score"]>0.90:
        x,y,w,h = face["facial_area"]
        face_img = img[y:y+h,x:x+w]
        
        # upload to cloundinary 
        upload_result = cloudinary.uploader.upload(file_bytes)
        image_url = upload_result["secure_url"]

        # resize and convert it to vector 
        face_img = cv.resize(face_img,(160,160))
        face_img = face_img.astype("float32")
        face_mean = face_img.mean()
        face_std = face_img.std()
        face_img = (face_img - face_mean) / face_std
        face_img = np.expand_dims(face_img, axis=0)
        
        #generating embedding 
        embedding = embedder.embeddings(face_img)[0]
        embedding = embedding / np.linalg.norm(embedding)
        
        #creating unique id 
        unique_id = str(uuid.uuid4())

        # storing in vector db 
        index.upsert([
        (
            unique_id,
            embedding.tolist(),
            {"name": name,
            "image_url":image_url
            }
        )
        ])
        
    return jsonify({
        "status":"sucess",
        "message":"image is uploaded to model"
    })

if __name__=="__main__":
    app.run(debug=True)
