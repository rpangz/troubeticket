<template>
  <div class="home">
    <div class="container-fluid mt-4">
      <h1>Trouble Ticket</h1>
      <div class="row">
        <div class="col text-left">
          <b-button variant="primary" @click="newData()"
            ><b-icon-plus></b-icon-plus> Add New Ticket</b-button
          >
        </div>
      </div>
      <hr />
      <div class="row">
        <div class="col">
          <h5>List Ticket Pending</h5>
          <table class="table table-hover table-sm">
            <caption>
              <em
                >* List ticket yang belum di kerjakan (
                {{ totalTicketPending + " Record" }} )</em
              >
            </caption>
            <thead>
              <tr class="table-danger">
                <th scope="col">#</th>
                <th scope="col">Company</th>
                <th scope="col">User</th>
                <th scope="col">Tanggal</th>
                <th scope="col">Topic</th>
                <th scope="col">Issue</th>
                <th scope="col">Handle By</th>
                <th scope="col">Solution</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in ticketpending" :key="item.id">
                <th scope="row" width="3%">{{ index + 1 }}</th>
                <td width="10%">{{ getCompany(item.ticket_company) }}</td>
                <td width="10%">{{ getName(item.ticket_user) }}</td>
                <td width="7%">{{ item.tgl }}</td>
                <td width="5%">{{ item.ticket_item_desc }}</td>
                <td width="30%">{{ item.ticket_description }}</td>
                <td width="5%">{{ getName(item.ticket_agent) }}</td>
                <td width="20%">
                  {{ item.ticket_remarks }}
                </td>
                <td width="10%">
                  <div style="font-size: 2rem">
                    <b-icon
                      icon="pencil-fill"
                      class="rounded-circle bg-danger p-2"
                      variant="light"
                      @click="editData(item.ticket_id)"
                    ></b-icon>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <hr />
      <div class="row">
        <div class="col">
          <h5>Ticket Hari Ini</h5>
          <table class="table table-hover table-sm">
            <caption>
              <em
                >* List data ticket hari ini (
                {{ totalTicketHariIni + " Record" }} )</em
              >
            </caption>
            <thead>
              <tr class="table-success">
                <th scope="col">#</th>
                <th scope="col">Company</th>
                <th scope="col">User</th>
                <th scope="col">Tanggal</th>
                <th scope="col">Topic</th>
                <th scope="col">Issue</th>
                <th scope="col">Handle By</th>
                <th scope="col">Solution</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in tickethariini" :key="item.id">
                <th scope="row" width="3%">{{ index + 1 }}</th>
                <td width="10%">{{ getCompany(item.ticket_company) }}</td>
                <td width="10%">{{ getName(item.ticket_user) }}</td>
                <td width="7%">{{ item.tgl }}</td>
                <td width="5%">{{ item.ticket_item_desc }}</td>
                <td width="30%">{{ item.ticket_description }}</td>
                <td width="5%">{{ getName(item.ticket_agent) }}</td>
                <td width="20%">
                  {{ item.ticket_remarks }}
                </td>
                <td width="10%">{{ item.ticket_status_desc }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- modal -->
    <b-modal
      ref="inputModal"
      id="modal-xl"
      size="xl"
      v-bind:title="newTicket.inputStatus"
      @ok="saveData"
      ok-variant="primary"
      v-bind:ok-title="newTicket.prosesLabel"
    >
      <form>
        <div class="form-group row">
          <label for="inputUser" class="col-sm-2 col-form-label">User</label>
          <div class="col-auto">
            <select
              class="custom-select"
              id="selectUser"
              v-model="newTicket.user"
            >
              <option value="0">- Select User -</option>
              <option
                v-for="option in spekData.user"
                :value="option.nik"
                :key="option.id"
              >
                {{ option.nama }}
              </option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <label for="inputTopik" class="col-sm-2 col-form-label">Topik</label>
          <div class="col-auto">
            <select
              class="custom-select"
              id="selectTopik"
              v-model="newTicket.topik"
            >
              <option value="0">- Select Topik -</option>
              <option
                v-for="option in spekData.ticketitem"
                :value="option.ItemID"
                :key="option.id"
              >
                {{ option.Description }}
              </option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <label for="inputLokasi" class="col-sm-2 col-form-label"
            >Lokasi</label
          >
          <div class="col-auto">
            <select
              class="custom-select"
              id="selectLokasi"
              v-model="newTicket.lokasi"
            >
              <option value="0">- Select Lokasi -</option>
              <option
                v-for="option in spekData.ticketwarehouse"
                :value="option.iWarehouseId"
                :key="option.id"
              >
                {{ option.cWarehouseName }}
              </option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <label for="inputIssue" class="col-sm-2 col-form-label"
            >Issue Detail</label
          >
          <div class="col-sm-10">
            <textarea
              class="form-control"
              id="selectIssue"
              rows="3"
              v-model="newTicket.issue"
            ></textarea>
          </div>
        </div>
        <div class="form-group row">
          <label for="inputAgent" class="col-sm-2 col-form-label"
            >Handle By</label
          >
          <div class="col-auto">
            <select
              class="custom-select"
              id="inputAgent"
              v-model="newTicket.agent"
            >
              <option value="0">- Select Agent -</option>
              <option
                v-for="option in spekData.useragent"
                :value="option.nik"
                :key="option.id"
              >
                {{ option.nama }}
              </option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <label for="inputSolution" class="col-sm-2 col-form-label"
            >Solution</label
          >
          <div class="col-sm-10">
            <textarea
              class="form-control"
              id="selectSolution"
              rows="3"
              v-model="newTicket.solution"
            ></textarea>
          </div>
        </div>
        <div class="form-group row">
          <label for="inputFinish" class="col-sm-2 col-form-label"
            >Finish Handled</label
          >
          <div class="col-auto">
            <b-form-datepicker
              id="inputFinish"
              v-model="newTicket.finish"
              class="mb-2"
              today-button
            ></b-form-datepicker>
          </div>
        </div>
        <div class="form-group row">
          <label for="inputStatus" class="col-sm-2 col-form-label"
            >Status*</label
          >
          <div class="col-auto">
            <select
              class="custom-select"
              id="inputStatus"
              v-model="newTicket.status"
            >
              <option
                v-for="option in spekData.ticketstatus"
                :value="option.StatusID"
                :key="option.id"
              >
                {{ option.Description }}
              </option>
            </select>
          </div>
        </div>
      </form>
    </b-modal>
  </div>
</template>




<script>
// @ is an alias to /src
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      ticketpending: [],
      tickethariini: [],
      totalTicketPending: 0,
      totalTicketHariIni: 0,
      spekData: {},
      newTicket: {},
      endpoint: "http://eca.unias.com/restserver/api_emsa/",
      token: "123456",
    };
  },
  methods: {
    resetForm: function () {
      this.newTicket = {
        prosesStatus: "ok",
        prosesLabel: "Save",
        inputStatus: "New Data",
        ticket_id: "",
        user: "0",
        topik: "0",
        lokasi: "0",
        issue: "",
        solution: "",
        finish: "",
        agent: "0",
        status: "0",
      };
    },
    editData: function (data_id) {
      const newArray = this.ticketpending.filter((x) => {
        return x.ticket_id == data_id;
      });
      const dataObj = newArray[0];
      this.newTicket.inputStatus = "Edit Data";
      this.newTicket.user = dataObj.ticket_user;
      this.newTicket.topik = dataObj.ticket_item;
      this.newTicket.lokasi = dataObj.ticket_location;
      this.newTicket.issue = dataObj.ticket_description;
      this.newTicket.solution = dataObj.ticket_remarks;
      this.newTicket.finish = dataObj.ticket_finish;
      this.newTicket.agent = dataObj.ticket_agent;
      this.newTicket.status = dataObj.ticket_status;
      this.newTicket.ticket_id = dataObj.ticket_id;
      this.$refs["inputModal"].show();
    },
    newData: function () {
      this.resetForm();
      this.$refs["inputModal"].show();
    },
    setData: function (data) {
      this.ticketpending = data.datapending;
      this.tickethariini = data.datahariini;
      this.totalTicketPending = data.totalpending;
      this.totalTicketHariIni = data.totalhariini;
    },
    loadTicket: function () {
      const config = {
        headers: { "content-type": "application/x-www-form-urlencoded" },
      };

      try {
        axios
          .get(this.endpoint + "ticket?token=" + this.token, config)
          .then((response) => {
            return this.setData(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }

      // this.$router.push({ path: "/pesanan-sukses" });
    },
    loadSpekData: async function () {
      const config = {
        headers: { "content-type": "application/x-www-form-urlencoded" },
      };
      await axios
        .get(this.endpoint + "spekdata?token=" + this.token, config)
        .then((response) => {
          return (this.spekData = response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    startUp: async function () {
      await this.loadSpekData();
      await this.resetForm();
      await this.loadTicket();
      setInterval(() => {
        this.loadTicket();
      }, 30000);
    },
    getName: function (nik) {
      const masterData = this.spekData.user;
      const valueArr = masterData.filter((x) => {
        return x.nik == nik;
      });
      const valueArrObj = valueArr[0];
      if (valueArr.length > 0) {
        return valueArrObj.nama;
      } else {
        return "-";
      }
    },
    getCompany: function (companyid) {
      const masterData = this.spekData.company;
      const valueArr = masterData.filter((x) => {
        return x.iCompanyId == companyid;
      });
      const valueArrObj = valueArr[0];
      if (valueArr.length > 0) {
        return valueArrObj.cCompanyCode;
      } else {
        return "-";
      }
    },
    saveData: function (bvModalEvt) {
      this.newTicket.token = this.token;
      bvModalEvt.preventDefault();
      this.lockModal();
      axios
        .post(this.endpoint + "ticket", this.newTicket)
        .then((response) => {
          this.unlockModal();
          const checkerror = response.data.error;
          if (checkerror) {
            throw new Error(response.data.message);
          } else {
            this.loadTicket();
            this.$toast.success("Data Berhasil Di Simpan");
          }
        })
        .catch((error) => {
          this.$toast.error(error);
        });
    },
    lockModal: function () {
      this.newTicket.prosesLabel = "Processing. . .";
      this.newTicket.prosesStatus = "pending";
    },
    unlockModal: function () {
      this.newTicket.prosesLabel = "Save";
      this.newTicket.prosesStatus = "ok";
      this.$refs["inputModal"].hide();
    },
  },
  components: {},
  mounted() {
    this.startUp();
  },
};
</script>
