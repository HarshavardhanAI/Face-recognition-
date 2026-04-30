const BASE = import.meta.env.VITE_API_URL 

export const analyseImage = (imageFile) => {
    const formData = new FormData()
    formData.append('image', imageFile)
    return fetch(`${BASE}/dashboard`, {
        method: 'POST',
        body: formData
    }).then(r => r.json())
}

export const addPerson = (imageFile, name) => {
    const formData = new FormData()
    formData.append('image', imageFile)
    formData.append('name', name)
    return fetch(`${BASE}/addperson`, {
        method: 'POST',
        body: formData
    }).then(r => r.json())
}

export const getDatabase = () => {
    return fetch(`${BASE}/database`)
        .then(r => r.json())
}

export const deletePerson = (name) => {
    return fetch(`${BASE}/deleteperson`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
    }).then(r => r.json())
}
