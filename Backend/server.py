from flask import Flask,jsonify,request
from flask_cors import CORS
import cv2 as cv
import numpy as np
from retinaface import RetinaFace

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return jsonify({"message":"hello world"})

@app.route("/addperson",methods=["POST"])
def add_person():
    name = request.form.get("name")
    file = request.files.get("image")
    file_bytes = np.frombuffer(file.read(), np.uint8)
    img = cv.imdecode(file_bytes, cv.IMREAD_COLOR)
    faces = RetinaFace.detect_faces(img)
    if len(faces) ==0:
        return jsonify({"status":"no face","message":"no face is detected"})
    if len(faces) >1:
        return jsonify({"status":"multiple faces","message":"more than one face is in image"})

    face = faces["face_1"]
    if face["score"]>0.90:
        face_img = img[]
        

    return jsonify({
        "status":"sucess",
        "message":"image is uploaded to model"
    })

if __name__=="__main__":
    app.run(debug=True)
