import  firebase from '../config/firebase';
 
export default function UploadHelper(){
    
const  uploadTaskPromise = async(rootFolder, filename, file) => {
    return new Promise(function(resolve, reject) {

      const storage = firebase.storage();
      const storageRef = storage.ref(rootFolder)
      const uploadTask = storageRef.child(filename).put(file)
      uploadTask.on('state_changed',
        function(snapshot) {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
        },
        function error(err) {
          console.log('error', err)
          reject()
        },
        function complete() {
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            resolve(downloadURL)
          });
        }
      )
    })
  }

  return {uploadTaskPromise}

}
