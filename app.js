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
// const notify = document.getElementById("notify");

async function addData() {
  const input_name = document.getElementById("input_name");
  const input_email = document.getElementById("input_email");

  try {
    const docRef = await addDoc(collection(db, "users"), {
      name: input_name.value,
      email: input_email.value,
    });

    // notify.innerHTML = `Data Added Successfully ID: ${docRef.id}`;
    Swal.fire(`ID: ${docRef.id}`, "Data Added Successfully", "success");
    input_name.value = "";
    input_email.value = "";

    setTimeout(() => {
      // notify.innerHTML = "";
    }, 2000);

    getData();

    // console.log("Document written with ID: ", docRef.id);
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
      // ham is tareeke se b doc data ko read ya get kar sakty hen(1)
      // console.log(`${doc.id}`);
      // const { name, email } = doc.data();
      // console.log(name, email);

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
    // notify.innerHTML = "Data Deleted";
    Swal.fire(`ID: ${id}`, "Data Deleted successfully!", "success");

    // setTimeout(() => {
    //   notify.innerHTML = "";
    // }, 2000);
    getData();
  } catch (e) {
    console.log(e);
  }
};

// update data

// window.updateData = async function (id) {
//   try {
//     const docSnapShot = await getDoc(doc(db, "users", id));
//     const currentUser = docSnapShot.data();
//     document.getElementById("input_name").value = currentUser.name;
//     document.getElementById("input_email").value = currentUser.email;

//     const updateDataBtn = document.getElementById("updateData");
//     updateDataBtn.classList.add("show");
//     submitData.classList.add("hide");

//     updateDataBtn.replaceWith(updateDataBtn.cloneNode(true));
//     updateDataBtn.addEventListener("click", async function () {
//       const newName = document.getElementById("input_name").value;
//       const newEmail = document.getElementById("input_email").value;

//       if (newName && newEmail) {
//         await updateDoc(doc(db, "users", id), {
//           name: newName,
//           email: newEmail,
//         });

//         notify.innerHTML = "Data Updated Successfully!";
//         setTimeout(() => {
//           notify.innerHTML = "";
//         }, 2000);
//         getData();

//         // Reset form
//         document.getElementById("input_name").value = "";
//         document.getElementById("input_email").value = "";
//         updateDataBtn.classList.remove("show");
//         submitData.classList.remove("hide");
//       }
//     });
//     // updateDataBtn.classList.remove("show");
//     // submitData.classList.remove("hide");
//   } catch (e) {
//     console.log(e);
//   }
// };



window.updateData = async function (id) {
  try {
    // Fetch the document snapshot and populate the input fields
    const docSnapShot = await getDoc(doc(db, "users", id));
    const currentUser = docSnapShot.data();
    document.getElementById("input_name").value = currentUser.name;
    document.getElementById("input_email").value = currentUser.email;

    // Show the update button and hide the submit button
    const updateDataBtn = document.getElementById("updateData");
    updateDataBtn.classList.add("show");
    submitData.classList.add("hide");

    // Remove existing event listeners by replacing the button
    const newUpdateDataBtn = updateDataBtn.cloneNode(true);
    updateDataBtn.replaceWith(newUpdateDataBtn);

    // Attach a single event listener for the update operation
    newUpdateDataBtn.addEventListener("click", async function () {
      const newName = document.getElementById("input_name").value;
      const newEmail = document.getElementById("input_email").value;

      if (newName && newEmail) {
        await updateDoc(doc(db, "users", id), {
          name: newName,
          email: newEmail,
        });

        // Notify success
        // notify.innerHTML = "Data Updated Successfully!";
        Swal.fire(`ID: ${id}`, "Data Updated Successfully!", "success");
        // setTimeout(() => {
        //   notify.innerHTML = "";
        // }, 2000);

        // Refresh the table and reset the form
        getData();
        document.getElementById("input_name").value = "";
        document.getElementById("input_email").value = "";

        // Hide the update button and show the submit button
        newUpdateDataBtn.classList.remove("show");
        submitData.classList.remove("hide");
      } else {
        // notify.innerHTML = "Please fill out all fields!";
        Swal.fire("Error", "Please fill out all fields!", "error");
        // setTimeout(() => {
        //   notify.innerHTML = "";
        // }, 2000);
      }
    });
  } catch (e) {
    console.error("Error updating document:", e);
  }
};
