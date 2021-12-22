<template>
  <div class="d-flex flex-column" id="content-wrapper">
        <div id="content">
            
            <div class="container-fluid">
                <div class="card shadow">
                    <div class="card-header py-4" style="text-align:center">
                        <p class="h4 text-primary"><b>Vehículo</b></p>
                        <p class="h4 text-primary" ><b>{{userLicense}}</b></p>
                    </div>
                   
      <div class="detl">
      <div class="form-group">
      <label for="horaEntrada">Entrada</label>
      <input type="text" class="form-control" id="horaEntrada" v-model="clientByLicensePlate.entryDate" placeholder="Fecha de ingreso" disabled>
      </div>
      <div class="form-group">
      <label for="horaSalida">Salida</label>
      <input type="text" class="form-control" id="horaSalida" v-model="clientByLicensePlate.exitDate" placeholder="Fecha de salida" disabled>
      </div>
      <div class="form-group">
      <label for="tiempo">Tiempo de Uso</label>
      <input type="text" class="form-control" id="tiempo" v-model="clientByLicensePlate.useTime" placeholder="Tiempo total" disabled>
      </div>
      <div class="form-group">
      <label for="costo">Costo</label>
      <input type="text" class="form-control" id="costo" v-model="clientByLicensePlate.cost" placeholder="Costo total" disabled>
      </div>
      <div class="button-group">
        <button class="btn-primary" v-on:click="returnView">Cancelar</button>
        <button  class="btn-primary" v-on:click="saveClient">Guardar</button>
      </div>
      </div>
                </div>
              </div>
        </div>
        </div>    
    
      
    
 
  
</template>
<script>
import gql from "graphql-tag";
export default {
  name: 'DetailByLicensePlate',
  data () {
    return {
        userLicense: localStorage.getItem("licensePlate"),
        clientByLicensePlate: {
            billNumber: null,
            cost: 0,
            entryDate: "",
            exitDate: "",
            licensePlate: "",
            state: "",
            useTime: 0,
        },
        
        clients:{
            licensePlate: "xwt-403",
            entryDate: "2021-12-11T15:05:06.287+00:00",
            exitDate: "2021-12-12T12:50:20.128+00:00",
            useTime: 1305,
            cost: 48285,
            state: "active"
    }
    }
  },
  
  methods: {
    returnView: function(){
        this.$router.push({name: "vehicles"})
    },
    saveClient: async function() {
        this.clients.licensePlate=this.clientByLicensePlate.licensePlate;
        this.clients.entryDate=this.clientByLicensePlate.entryDate;
        this.clients.exitDate=this.clientByLicensePlate.exitDate;
        this.clients.useTime=this.clientByLicensePlate.useTime;
        this.clients.cost=this.clientByLicensePlate.cost;

        await this.$apollo
            .mutate({
            mutation: gql`
                mutation SaveBilling($client: ClientInput!, $licensePlate: String!) {
                    saveBilling(client: $client, licensePlate: $licensePlate) {
                        licensePlate
                        entryDate
                        exitDate
                        useTime
                        cost
                        state
                        billNumber
                    }
                }
            `,
            variables: {
                client: this.clients,
                licensePlate:this.clientByLicensePlate.licensePlate
            },
            })
            .then((result) => {
                
                this.$router.push({name: "vehicles"})

                
            })
            .catch((error) => {
                console.log(error)
            alert("Ya se encuentra el vehiculo");
            })
            ;
        },

  },
  apollo: {
    clientByLicensePlate: {
      query: gql`
        query ClientByLicensePlate($licensePlate: String!) {
            clientByLicensePlate(licensePlate: $licensePlate) {
                licensePlate
                entryDate
                exitDate
                useTime
                cost
                state
                billNumber
            }
         }
      `,
      variables() {
        return {
            licensePlate: this.userLicense
        };
      },
    }
  }

}
</script>
<style>
.form-group {
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 15px;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.button-group {
  border-radius: 50px;
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 15px;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.detl {
  padding: 0px 30%;
}
.form-control{
  margin:2% 0px;
}
.btn-primary{
            
            border-radius: 20px;
        
        }
</style>