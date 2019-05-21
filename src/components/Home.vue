<template>
  <div class="hello">
    <!-- <h1>Conteo: {{ count }}</h1> -->
    <header>
      <button @click="contactus = true" id="btn-menu" href="#"><i class="fas fa-bars fa-2x"></i></button>
      <p class="business-name">Alfred Peluqueria</p>
      <img class="logo" src="../assets/logo.png">
    </header>
    <div class="date-holder"><p>{{ capitalize(date) }}</p></div>
    <div class="business-status" :class="status">
      <p>{{ status }}</p>
    </div>

    <div class="contactus" v-show="contactus">
      <img class="email-header" src="../assets/email.png">
      <h2>Contactanos</h2>
      <p class="title">Email:
        <span>alfred@alfredpeluqueria.com</span>
      </p>
      <p class="title">Telefono:
        <span>(829) 898-2704 (Whatsapp)</span>
      </p>
      <p class="title">Direccion:
        <span>C/El Molino, Frente a la Funeraria del Pueblo 2</span>
      </p>
      <button @click="contactus = false" class="btn-close-contactus"><i class="fas fa-times fa-2x"></i></button>
    </div>

    <div class="waiting-box">
      <p class="waiting-box__number">{{ count }}</p>
      <p class="waiting-box__text __purple">En turno</p>
      <p class="waiting-box__text __small-text">Actualizado {{ fromNow }}</p>
    </div>

    <!-- <div class="weather-box"></div> -->

    <button @click="getInfo" :class="btnRefreshClass" href="#"><i class="fas fa-2x" :class="btnRefreshClassIcon"></i></button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      count: 'N/A',
      status: 'N/A',
      btnRefreshClass: 'btn-refresh __bg-purple',
      btnRefreshClassIcon: 'fa-sync-alt',
      contactus: false,
      date: moment().format('dddd LL'),
      now: moment().format(),
      fromNow: moment(this.now).fromNow()
    }
  },
  props: {
    msg: String
  },
  methods: {
    getInfo () {
      this.btnRefreshClassIcon = 'fa-circle-notch fa-spin'
      client.auth.loginWithCredential(new stitch.AnonymousCredential()).then(user =>
      console.log(`Logged with user id: ${user.id}`)
    ).then(() =>
      db.collection('people_waiting').find({}).toArray()
    ).then(docs => {
        this.count = docs[0].count
        this.status = docs[0].status
        this.btnRefreshClass = 'btn-refresh __bg-green'
        this.btnRefreshClassIcon = 'fa-check'
        let timeout = setTimeout(() => {
          this.btnRefreshClass = 'btn-refresh __bg-purple'
          this.btnRefreshClassIcon = 'fa-sync-alt'
        }, 2000)
        this.now = moment().format()
        this.fromNow = moment(this.now).fromNow()
        console.log("Found docs", docs)
        console.log("[MongoDB Stitch] Connected to Stitch")
        // let iframe = document.getElementById(document.getElementsByTagName('iframe')[0].id)
        // iframe.src = iframe.src
        // this.iframeSource = this.iframeSource
    }).catch(err => {
      this.btnRefreshClass = 'fa-sync-alt'
      console.error(err)
      this.$message({
        message: 'No se pudo actualizar el conteo',
        type: 'error'
      })
    });

    },
    capitalize (string) {
      return string[0].toUpperCase() + string.substring(1, string.length)
    }
  },
  created () {
    this.getInfo()
    setInterval(() => {
      this.fromNow = moment(this.now).fromNow()
      this.date = moment().format('dddd LL')
    }, 60000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
div .hello {
  width: 100%;
  height: 100%;
}
button {
  border: none;
  background: none;
}
button:focus {
  outline: none;
}
header {
  width: 100%;
  height: 200px;
  /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#6a88ec+0,a350fb+100 */
  background: #6a88ec; /* Old browsers */
  background: -moz-linear-gradient(45deg, #6a88ec 0%, #a350fb 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(45deg, #6a88ec 0%,#a350fb 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(45deg, #6a88ec 0%,#a350fb 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#6a88ec', endColorstr='#a350fb',GradientType=1 ); 
  /* IE6-9 fallback on horizontal gradient */

  border-radius: 0px 0px 20px 20px;
  -moz-border-radius: 0px 0px 20px 20px;
  -webkit-border-radius: 0px 0px 20px 20px;
  border: 0px solid #000000;
}

#btn-menu {
  position: relative;
  left: 0.8rem;
  top: 1rem;
  color: #FFF;
}
.business-name {
  text-align: center;
  font-family: 'Pacifico', cursive;
  color: #FFF;
  font-size: 2rem; 
  width: 241px;
  position: relative;
  margin-right: auto;
  margin-left: auto;
}
.logo {
  position: relative;
  display: block;
  max-width: 107px;
  margin-left: auto;
  margin-right: auto;
}
.date-holder {
  text-align: center;
  font-weight: bold;
  display: table;
  margin-right: auto;
  margin-left: auto;
  position: relative;
  top: -25px;
  width: 320px;
  height: 50px;
  background-color: #FFF;
  border-radius: 115px 115px 115px 115px;
  -moz-border-radius: 115px 115px 115px 115px;
  -webkit-border-radius: 115px 115px 115px 115px;
  border: 0px solid #000000;
  -webkit-box-shadow: 0px 22px 30px 0px rgba(50, 50, 50, 0.28);
  -moz-box-shadow:    0px 22px 30px 0px rgba(50, 50, 50, 0.28);
  box-shadow:         0px 22px 30px 0px rgba(50, 50, 50, 0.28);
}
.date-holder p {
  display: table-cell;
  vertical-align: middle;
}
.business-status {
  height: 50px;
  width: 150px;
  background-color: grey;
  text-align: center;
  margin-right: auto;
  margin-left: auto;
  position: relative;
  top: -36px;
  z-index: -10;
  color: #FFF;
  border-radius: 15px;
  display: table;
}
.ABIERTO {
  background-color: #8BC34A;
}
.CERRADO {
  background-color: #D35952;
}
.business-status p {
  font-weight: bold;
  position: relative;
  display: table-cell;
  vertical-align: middle;
  /*top: 20px;*/
}

.contactus {
  height: 450px;
  width: 350px;
  background-color: #FFF;
  text-align: center;
  position: absolute;
  top: 75px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  border-radius: 20px;
  font-family: 'Montserrat', sans-serif;
  -webkit-box-shadow: 0px 22px 30px 0px rgba(50, 50, 50, 0.28);
  -moz-box-shadow:    0px 22px 30px 0px rgba(50, 50, 50, 0.28);
  box-shadow:         0px 22px 30px 0px rgba(50, 50, 50, 0.28);
}
.contactus img {
  max-width: 350px;
  border-radius: 20px 20px 0 0;
}
.contactus h2 {
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  color: #a350fb;
  font-weight: bold;
}
.contactus .title {
  color: #AEAEAE;
  display: block;
  margin-bottom: 35px;
  padding-left: 1rem;
  text-align: left;
}
.contactus .title span {
  color: #a350fb;
  display: block;
  margin-top: 15px;
}
.btn-close-contactus {
  color: #A350FB;
  position: relative;
}

.waiting-box {
  width: 100%;
  text-align: center;
}
.waiting-box__number {
  font-size: 6rem;
  font-weight: bold;
}
.__purple {
  color: #A350FB;
}
.__bg-purple {
  background-color: #A350FB;
}
.__bg-green {
  background-color: #8BC34A;
}
.__small-text {
  font-size: 0.7rem
}

.weather-box {
  border: 1px solid #000;
  width: 250px;
  height: 100px;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  margin-top: 3rem;
}

.btn-refresh {
  /*background-color: #A350FB;*/
  /*padding: 30px;*/
  width: 60px;
  height: 60px;
  border-radius: 60px;
  color: #FFF;
  position: fixed;
  border: none;
  right: 1rem;
  bottom: 1rem;
}
</style>
