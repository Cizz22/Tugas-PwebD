import data from "./data.js";

const listElement = document.querySelector("#list");
const searchButton = document.querySelector("#searchButton");
const searchInput = document.querySelector("#searchBar");
const submitButton = document.querySelector("#submitData");
const insertDatainput = {
  nama: document.querySelector("#name"),
  nrp: document.querySelector("#nrp"),
  hobi: document.querySelector("#hobi"),
  status: document.querySelector("#status"),
  gender: document.querySelector("#gender"),
};

class dataSource {
  static searchData(pencarian) {
    return new Promise((success, error) => {
      let filteredData = data.filter((datum) =>
        datum.nama.toLowerCase().includes(pencarian.toLowerCase())
      );

      if (filteredData.length) {
        success(filteredData);
      } else {
        error(`${pencarian} tidak ditemukan`);
      }
    });
  }
}

class Person {
  constructor(nama, gender) {
    this.nama = nama;
    this.gender = gender;
  }
}

class Mahasiswa extends Person {
  constructor(nama, gender, nrp, status, hobi) {
    super(nama, gender);
    this.nrp = nrp;
    this.status = status;
    this.hobi = hobi;
  }

  tambahData() {
    let tambahData = {
      nama: this.nama,
      nrp: this.nrp,
      gender: this.gender,
      status: this.status,
      hobi: this.hobi,
    };

    data.push(tambahData);
  }
}

class Dosen extends Person {
  constructor(nama, gender, nip, status, hobi) {
    super(nama, gender);
    this.nip = nip;
    this.status = status;
    this.matkul = hobi;
  }

  tambahData() {
    let tambahData = {
      nama: this.nama,
      nrp: this.nip,
      gender: this.gender,
      status: this.status,
      matkul: this.matkul,
    };

    data.push(tambahData);
  }
}

const mount = () => {
  listElement.innerHTML = "";
  console.log(data);
  data.forEach((datum) => {
    const itemElement = document.createElement("div");
    itemElement.setAttribute(
      "class",
      "item bg-gray-100 shadow-lg p-4 w-full lg:w-5/12 mb-2"
    );

    if (datum.status == "Mahasiswa") {
      const { nama, gender, nrp, status, hobi } = datum;

      itemElement.innerHTML = `<label class="block mb-2" for="">
        <span class="font-semibold text-lg">NRP/NIP</span>
        <p class="">${nrp}</p>
    </label>
    <label class="block mb-2" for="">
        <span class="font-semibold text-lg">Nama</span>
        <p class="">${nama}</p>
    </label>
    <label class="block mb-2" for="">
        <span class="font-semibold text-lg">Jenis Kelamin</span>
        <p class="">${gender}</p>
    </label>
    <label class="block mb-2" for="">
        <span class="font-semibold text-lg">Status</span>
        <p class="">${status}</p>
    </label>
    <label class="block mb-2" for="">
        <span class="font-semibold text-lg">Hobby</span>
        <p class="">${hobi}</p>
    </label>

    `;
    } else {
      const { nama, gender, nrp, status, matkul } = datum;

      itemElement.innerHTML = `<label class="block mb-2" for="">
        <span class="font-semibold text-lg">NRP/NIP</span>
        <p class="">${nrp}</p>
    </label>
    <label class="block mb-2" for="">
        <span class="font-semibold text-lg">Nama</span>
        <p class="">${nama}</p>
    </label>
    <label class="block mb-2" for="">
        <span class="font-semibold text-lg">Jenis Kelamin</span>
        <p class="">${gender}</p>
    </label>
    <label class="block mb-2" for="">
        <span class="font-semibold text-lg">Status</span>
        <p class="">${status}</p>
    </label>
    <label class="block mb-2" for="">
        <span class="font-semibold text-lg">Mata Kuliah yang diajar</span>
        <p class="">${matkul}</p>
    </label>`;
    }

    listElement.appendChild(itemElement);
  });
};

const searchData = (result) => {
  listElement.innerHTML = "";

  result.forEach((datum) => {
    const itemElement = document.createElement("div");
    itemElement.setAttribute(
      "class",
      "item bg-gray-100 shadow-lg p-4 w-full lg:w-5/12 mb-2"
    );

    if (datum.status == "Mahasiswa") {
      const { nama, gender, nrp, status, hobi } = datum;

      itemElement.innerHTML = `<label class="block mb-2" for="">
            <span class="font-semibold text-lg">NRP/NIP</span>
            <p class="">${nrp}</p>
        </label>
        <label class="block mb-2" for="">
            <span class="font-semibold text-lg">Nama</span>
            <p class="">${nama}</p>
        </label>
        <label class="block mb-2" for="">
            <span class="font-semibold text-lg">Jenis Kelamin</span>
            <p class="">${gender}</p>
        </label>
        <label class="block mb-2" for="">
            <span class="font-semibold text-lg">Status</span>
            <p class="">${status}</p>
        </label>
        <label class="block mb-2" for="">
            <span class="font-semibold text-lg">Hobby</span>
            <p class="">${hobi}</p>
        </label>`;
    } else {
      const { nama, gender, nrp, status, matkul } = datum;

      itemElement.innerHTML = `<label class="block mb-2" for="">
            <span class="font-semibold text-lg">NRP/NIP</span>
            <p class="">${nrp}</p>
        </label>
        <label class="block mb-2" for="">
            <span class="font-semibold text-lg">Nama</span>
            <p class="">${nama}</p>
        </label>
        <label class="block mb-2" for="">
            <span class="font-semibold text-lg">Jenis Kelamin</span>
            <p class="">${gender}</p>
        </label>
        <label class="block mb-2" for="">
            <span class="font-semibold text-lg">Status</span>
            <p class="">${status}</p>
        </label>
        <label class="block mb-2" for="">
            <span class="font-semibold text-lg">Mata Kuliah yang diajar</span>
            <p class="">${matkul}</p>
        </label>`;
    }

    listElement.appendChild(itemElement);
  });
};

const searchButtonClick = async () => {
  try {
    const result = await dataSource.searchData(searchInput.value);
    searchData(result);
    console.log("success");
  } catch (message) {
    Swal.fire({
      icon: "error",
      title: `${message}`,
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

const insertData = () => {
  const { nama, nrp, hobi, status, gender } = insertDatainput;
  console.log(
    nama.value,
    gender.value,
    nrp.value,
    status.options[status.selectedIndex].value,
    hobi.value
  );
  if (status.options[status.selectedIndex].value == "Mahasiswa") {
    let newMahasiswa = new Mahasiswa(
      nama.value,
      gender.value,
      nrp.value,
      status.options[status.selectedIndex].value,
      hobi.value
    );
    newMahasiswa.tambahData();
    mount();
    Swal.fire({
      icon: "success",
      title: `Penambahan data berhasil!`,
      showConfirmButton: false,
      timer: 1500,
    });
    nama.value = "";
    gender.value = "";
    nrp.value = "";
    status.options[status.selectedIndex].value = "";
    hobi.value = "";
  } else {
    let newDosen = new Dosen(
      nama.value,
      gender.value,
      nrp.value,
      status.options[status.selectedIndex].value,
      hobi.value
    );
    newDosen.tambahData();
    mount();
    Swal.fire({
      icon: "success",
      title: `Penambahan data berhasil!`,
      showConfirmButton: false,
      timer: 1500,
    });
    nama.value = "";
    gender.value = "";
    nrp.value = "";
    status.options[status.selectedIndex].value = "";
    hobi.value = "";
  }
};

window.addEventListener("DOMContentLoaded", mount);
searchButton.addEventListener("click", searchButtonClick);
submitButton.addEventListener("click", insertData);
