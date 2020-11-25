<template>
  <div class="home">
    <div class="container-fluid mt-4">
      <h1>Trouble Ticket</h1>
      <div class="row">
        <div class="col text-left">
          <b-button v-b-modal.modal-xl variant="primary"
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
                <td width="5%">{{ item.ticket_company }}</td>
                <td width="5%">{{ item.ticket_user }}</td>
                <td width="5%">{{ item.ticket_item }}</td>
                <td width="30%">{{ item.ticket_description }}</td>
                <td width="5%">{{ item.ticket_agent }}</td>
                <td width="30%">
                  {{ item.ticket_remarks }}
                </td>
                <td width="10%">
                  <div style="font-size: 2rem">
                    <b-icon
                      icon="pencil-fill"
                      class="rounded-circle bg-danger p-2"
                      variant="light"
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
                <td width="5%">{{ item.ticket_company }}</td>
                <td width="5%">{{ item.ticket_user }}</td>
                <td width="5%">{{ item.ticket_item }}</td>
                <td width="30%">{{ item.ticket_description }}</td>
                <td width="5%">{{ item.ticket_agent }}</td>
                <td width="30%">
                  {{ item.ticket_remarks }}
                </td>
                <td width="10%">{{ item.ticket_status }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- modal -->
    <b-modal id="modal-xl" size="xl" title="Extra Large Modal"
      >Hello Extra Large Modal!</b-modal
    >
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
      newticket: {},
      endpoint: "http://eca.unias.com/restserver/api_emsa/",
      token: "123456",
    };
  },
  methods: {
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

      axios
        .get(this.endpoint + "ticket?token=" + this.token, config)
        // .get("http://www.omdbapi.com/?s=potter&apikey=699b6d8b")
        .then((response) => {
          return this.setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      // this.$router.push({ path: "/pesanan-sukses" });

      // console.log(this.ticketpending);
    },
    loadSpekData: function () {
      axios
        .get(this.endpoint + "ticket?token=" + this.token, config)
        // .get("http://www.omdbapi.com/?s=potter&apikey=699b6d8b")
        .then((response) => {
          return this.setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  components: {},
  mounted() {
    this.loadTicket();
    // setInterval(() => {
    //   console.log("tessst");
    // }, 2000);
  },
};
</script>
