import firebase from '../../config/firebase';

const SocialAuthProvider = provider => {
    return firebase
        .auth()
        .signInWithPopup(provider)
        .then(resp => {
        return resp.user;
    }).catch(err => {
        return err;
    })
}

export default SocialAuthProvider;