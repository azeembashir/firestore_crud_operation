import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD-i71F4wSBXQRDEMOwS4MUxQW6ZMwOdrI",
  authDomain: "crud-operation-71038.firebaseapp.com",
  projectId: "crud-operation-71038",
  storageBucket: "crud-operation-71038.firebasestorage.app",
  messagingSenderId: "139459005251",
  appId: "1:139459005251:web:42c41b3f4e53b0777bbdf6",
  measurementId: "G-T91E20PRFR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// create data


async function addData() {
  const input_name = document.getElementById("input_name");
  const input_email = document.getElementById("input_email");

  try {
    const docRef = await addDoc(collection(db, "users"), {
      name: input_name.value,
      email: input_email.value,
    });

    
    Swal.fire(`ID: ${docRef.id}`, "Data Added Successfully", "success");
    input_name.value = "";
    input_email.value = "";

    setTimeout(() => {
      
    }, 2000);

    getData();

    
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

const submitData = document.getElementById("submitData");
submitData.addEventListener("click", addData);

// get data

async function getData() {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    let html = "";
    querySnapshot.forEach((doc) => {
      

      // (2)
      const data = doc.data();

      html += `

      

      <tr>
        <td>${doc.id}</td>
        <td>${data.name}</td>
        <td>${data.email}</td>
        <td><button class="del_btn" onclick="deleteData('${doc.id}')">Delete</button></td>
        <td><button class="upd_btn" onclick="updateData('${doc.id}')">Update</button></td>
      </tr>
      
       `;
    });

    document.getElementById("table_data").innerHTML = html;
  } catch (e) {
    console.log(e);
  }
}
getData();

// delete data

window.deleteData = async function (id) {
  try {
    await deleteDoc(doc(db, "users", id));
  
    Swal.fire(`ID: ${id}`, "Data Deleted successfully!", "success");

    
    getData();
  } catch (e) {
    console.log(e);
  }
};




window.updateData = async function (id) {
  try {
    
    const docSnapShot = await getDoc(doc(db, "users", id));
    const currentUser = docSnapShot.data();
    document.getElementById("input_name").value = currentUser.name;
    document.getElementById("input_email").value = currentUser.email;

    
    const updateDataBtn = document.getElementById("updateData");
    updateDataBtn.classList.add("show");
    submitData.classList.add("hide");

    
    const newUpdateDataBtn = updateDataBtn.cloneNode(true);
    updateDataBtn.replaceWith(newUpdateDataBtn);

  
    newUpdateDataBtn.addEventListener("click", async function () {
      const newName = document.getElementById("input_name").value;
      const newEmail = document.getElementById("input_email").value;

      if (newName && newEmail) {
        await updateDoc(doc(db, "users", id), {
          name: newName,
          email: newEmail,
        });

        
        Swal.fire(`ID: ${id}`, "Data Updated Successfully!", "success");
        
        getData();
        document.getElementById("input_name").value = "";
        document.getElementById("input_email").value = "";

        
        newUpdateDataBtn.classList.remove("show");
        submitData.classList.remove("hide");
      } else {
        
        Swal.fire("Error", "Please fill out all fields!", "error");
        
      }
    });
  } catch (e) {
    console.error("Error updating document:", e);
  }
};
