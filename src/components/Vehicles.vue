<template>
 <div class="d-flex flex-column" id="content-wrapper">
        <div id="content">
            
            <div class="container-fluid">
                <div class="card shadow">
                    
    <div  class="form-container mt-5">
        <form v-on:submit.prevent="createClient" class="w-70 mx-auto" id="entryForm">            
            <div class="form-group">
                <h2>Vehículos</h2><br><br>
            </div>
            <div class="row">
                <div class="col-2">
                    <button type="submit" class="btn-primary add-car">Agregar carro</button>
                </div>
                <div class="col-4 ">
                    <div class="intp">
                        <input v-model="newUser.licensePlate" type="text" class="form-control" id="licensePlate" placeholder="Ingresar Placa">
                    </div>
                </div>
                <div class="col-4">
                    <div class="available-spaces">
                        <!---<img src="https://cdn-icons.flaticon.com/png/512/3097/premium/3097136.png?token=exp=1639187318~hmac=b5efb244e94633d459d19bb9b5625850" class="space-icon" width="45"></img> -->
                        <div class="content-spaces">
                            <span class="number-spaces">{{clientByActiveState.capacity}}</span>
                            <span class="text-spaces">Espacios disponibles</span>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <div class="table-container mt-5 mb-5 w-75 mx-auto" >
            <h5 class="mb-3">Consulta por placa</h5>
            <div class="parkingTable">
                <div class="parking-head">
                    <span class="parking-badge">Placa</span>
                    <span class="parking-entry">Fecha de entrada</span>
                    <span class="parking-entry">Consulta</span> 
                </div>



                <div v-for="activeClients in clientByActiveState.clients" :key="activeClients.id" class="parking-content">

                    <span class="badge">{{activeClients.licensePlate}}</span>
                    <span class="date">{{activeClients.entryDate}}</span>
                    <span class="search-entry">
                        <button v-on:click="loadDetailByLicensePlate(activeClients.licensePlate)" name="" class="btn-primary">Consultar</button>
                    </span>

                </div>

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
  name: "Vehicles",
  data: function () {
    return {
        newUser:{
            licensePlate:""
        },
        user: "user",
        clientByActiveState: {
            clients:[],
            capacity:0
      }
    };
  },
  methods: {
    loadDetailByLicensePlate: async function(license){
        
        await localStorage.setItem("licensePlate", license);
    
        this.$router.push({name: "detailByLicensePlate"})
    },

    createClient: async function() {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation CreateClient($client: ClientInput!) {
                createClient(client: $client) {
                    licensePlate
                    entryDate
                    exitDate
                    useTime
                    cost
                    state
                    
                }
            }
          `,
          variables: {
            client: this.newUser,
          },
        })
        .then((result) => {
            
            this.$apollo.queries.clientByActiveState.refetch()
        })
        .catch((error) => {
          alert("Ya se encuentra el vehiculo");
        })
        ;
    },

  },
  apollo: {
    clientByActiveState: {
      query: gql`
        query ClientByActiveState($user: String) {
            clientByActiveState(user: $user) {
                clients {
                billNumber
                state
                cost
                useTime
                exitDate
                entryDate
                licensePlate
                }
                capacity
            }
        }
      `,
      variables() {
        return {
          user: "user",
        };
      },
    }
  },
  created: function () {
    this.$apollo.queries.clientByActiveState.refetch();
  }

  
};
</script>

<style >
.w-70 {
            width: 70% !important;
        }

        .add-car,
        .search-car {
            width: 100%;
            padding: .5em;
        }

        .parking-head {
            background-color: #e3e3e3;
        }

        .parking-content {
            background-color: #f7f7f7;
        }

        .parking-head span,
        .parking-content span {
            display: inline-block;
            width: 32%;
            text-align: center;
            font-weight: bold;
            padding: .3em;
        }

        .parking-content span {
            font-weight: normal;
        }

        .content-spaces {
            display: inline-block;
        }

        .content-spaces span {
            display: block;
            text-align: center;
        }

        .content-spaces .number-spaces {
            font-weight: bold;
            color: #403de7;
        }

        .available-spaces {
            position: relative;
            bottom: 9px;
            left: 10px;
            margin-right: 50px;
        }

        .available-spaces img {
            position: relative;
            bottom: 9px;
            left: 10px;
            margin-right: 50px;
        }
        .badge {
            color: black;
        }
        
        .btn-primary{
            
            border-radius: 20px;
        
        }
        .form-control {
            border-radius: 20px;
        }
</style>