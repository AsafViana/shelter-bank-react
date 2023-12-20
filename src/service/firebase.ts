import env from '../../env.json'
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, signInAnonymously, setPersistence, Persistence } from 'firebase/auth'
import {getDatabase, ref, set, onValue, child, get} from 'firebase/database'
import { collection, getDocs, getFirestore, addDoc, doc, updateDoc } from 'firebase/firestore'


const app = initializeApp(env.firebaseConfig)
const auth = getAuth(app)
const realtime = getDatabase(app)
const db = getFirestore(app)

const NONE: Persistence = {type: 'NONE'}
const LOCAL: Persistence = {type: 'LOCAL'}
const SESSION: Persistence = {type: 'SESSION'}

export {
	auth,
	realtime,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
	signOut,
	ref,
	set,
	onValue,
	signInAnonymously,
	child,
	get,
	db,
	collection,
	getDocs,
	addDoc,
	NONE,
	SESSION,
	LOCAL,
	setPersistence,
	doc
}

