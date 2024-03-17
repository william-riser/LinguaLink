import { useState, useEffect, useRef } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  onSnapshot,
  getDoc,
  updateDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { firebaseConfig } from "../../firebase-config";

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const provider = new GoogleAuthProvider();

const VideoChat = () => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [callId, setCallId] = useState("");
  const [pc, setPc] = useState(null);
  let webcamRef = useRef(null);
  const remoteRef = useRef(null);
  const db = getFirestore(initializeApp(firebaseConfig)); // Initialize db here // maybe use useEffect
  const reportRef = collection(db, "reports");

  useEffect(() => {
    const servers = {
      iceServers: [
        {
          urls: [
            "stun:stun1.l.google.com:19302",
            "stun:stun2.l.google.com:19302",
          ],
        },
      ],
      iceCandidatePoolSize: 10,
    };

    setPc(new RTCPeerConnection(servers));

    return () => {
      // Cleanup logic if needed
    };
  }, []);

  const handleWebcamButtonClick = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    if (webcamRef.current) {
      webcamRef.current.srcObject = stream; // Corrected ref
    }
    setLocalStream(stream);
    setRemoteStream(new MediaStream());

    stream.getTracks().forEach((track) => {
      pc.addTrack(track, stream);
    });

    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        if (remoteRef.current) {
          remoteRef.current.srcObject = event.streams[0];
        }
        remoteStream.addTrack(track);
      });
    };
  };

  const handleCallButtonClick = async () => {
    const callDocRef = doc(collection(db, "calls")); // Create ref with auto-ID
    const callDoc = doc(db, "calls", callDocRef.id);
    const offerCandidates = collection(
      db,
      "calls",
      callDoc.id,
      "offerCandidates",
    );
    const answerCandidates = collection(
      db,
      "calls",
      callDoc.id,
      "answerCandidates",
    );

    setCallId(callDocRef.id);

    pc.onicecandidate = (event) => {
      event.candidate && addDoc(offerCandidates, event.candidate.toJSON());
    };

    const offerDescription = await pc.createOffer();
    await pc.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    await setDoc(callDocRef, { offer });

    onSnapshot(callDocRef, (doc) => {
      const data = doc.data();
      if (!pc.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        pc.setRemoteDescription(answerDescription);
      }
    });
  };

  const handleAnswerButtonClick = async () => {
    const callDoc = doc(db, "calls", callId);
    const offerCandidates = collection(db, "calls", callId, "offerCandidates");
    const answerCandidates = collection(
      db,
      "calls",
      callId,
      "answerCandidates",
    );

    pc.onicecandidate = (event) => {
      event.candidate && addDoc(answerCandidates, event.candidate.toJSON());
    };

    const callDocSnap = await getDoc(callDoc);
    const callData = callDocSnap.data();

    const offerDescription = callData.offer;
    await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

    const answerDescription = await pc.createAnswer();
    await pc.setLocalDescription(answerDescription);

    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    };

    await updateDoc(callDoc, { answer });

    onSnapshot(offerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const data = change.doc.data();
          pc.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
  };

  const handleHangup =  async () => {
    // Close the Peer Connection

    pc.close(); 

    // Stop local and remote streams
    localStream.getTracks().forEach((track) => track.stop());
    remoteStream.getTracks().forEach((track) => track.stop());

    // Set the stream references to null for cleanup
    setLocalStream(null);
    setRemoteStream(null);

    // (Optional) Delete the call document from Firestore
    if (callId) {
      await deleteDoc(doc(db, "calls", callId));
      setCallId("");     
    }
  }

  const handleReport = async () => {
    // Report the user
    addDoc(reportRef, {
      reportedBy: "user1",
      reportType: "inappropriate",
      reportedUser: "user2",
      reportDate: new Date(),
    });
  }


  return (
    <div className="container mx-auto p-6 flex-col ml-5 rounded-xl bg-opacity-80"> 
      <h1 className="text-3xl font-bold mb-2 text-gray-500">Video Chat</h1>
      <button
          onClick={handleWebcamButtonClick}
          disabled={!!localStream}
          className="bg-blue-400 hover:bg-blue-500 text-white font-medium py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 mt-4"
        >
          Start webcam
        </button>
        <button
          onClick={handleCallButtonClick}
          disabled={!localStream}
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          Create Call (offer)
        </button>
      <section className="webcam-section mb-8">
        
        <div className="relative">
          <video
            id="webcamVideo"
            autoPlay
            playsInline
            ref={webcamRef}
            className="rounded-xl z-10 absolute top-0 right-4 w-40 h-40 opacity-100"
          ></video>
        </div>
        <div className="relative">
          <video
            id="remoteVideo"
            autoPlay
            playsInline
            ref={remoteRef}
            className=" z-0 w-full rounded-xl"
          ></video>
        </div>
        
      </section>

      <section className="call-actions mb-8">
        
      </section>

      <h2 className="text-lg pl-2 font-bold mb-1 text-white">Call code</h2>
      <input 
        value={callId}
        onChange={(e) => setCallId(e.target.value)}
        className="border border-gray-300 rounded-md p-2 m-2"
      />
      <button
        onClick={handleAnswerButtonClick}
        disabled={!callId}
        className="bg-blue-400 hover:bg-blue-500 text-white font-medium py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 mt-2"
      >
        Answer
      </button>
      <button  className="bg-red-500 hover:bg-red-600 mx-2 text-white p-3 rounded-md" onClick={handleHangup}>
        Hang up 
      </button>
      <button className="bg-red-500 hover:bg-red-600 mx-2 text-white p-3 rounded-md" onClick={handleReport}>
        Report
      </button>

    </div>
  );
};

export default VideoChat;
