<template>

<div id="wrapper">
    <div class="d-flex flex-column" id="content-wrapper">
        <div id="content">
            
            <div class="container-fluid">
                <div class="card shadow">
                    <div class="card-header py-4">
                        <p class="h4 text-primary"><b>Reporte histórico de servicios facturados</b></p>
                    </div>

                    

                    <div class="card-body">
                        
    
<!--FECHAS A CONSULTAR-->
        
        <div class="container" >
            
            <div class="row">

                
        

          
<!--INTRODUCCIÓN DE LA TABLA-->
        <div class="col-lg-9">
    
                        <div class="table-responsive table mt-7" id="históricos" role="grid" aria-describedby="dataTable_info" style="overflow-x:auto" align="left">
                            <table class="table table-striped" id="histórico">
                                <thead>
                                                                
                                    <tr>
                                        <th>No. Factura</th>
                                        <th>Placa</th>
                                        <th>Fecha ingreso</th>
                                        <th>Fecha salida</th>
                                        <th>Tiempo de uso (minutos)</th>
                                        <th>Valor pagado</th>
                                    </tr>
                                    
                                </thead>
                                <tbody>
                                    
                                     <tr v-for="inactiveClients in newclientByInactiveState.clients" :key="inactiveClients.id">
                                        <th>{{inactiveClients.billNumber}}</th>
                                        <th>{{inactiveClients.licensePlate}}</th>
                                        <th>{{inactiveClients.entryDate}}</th>
                                        <th>{{inactiveClients.exitDate}}</th>
                                        <th>{{inactiveClients.useTime}}</th>
                                        <th>${{inactiveClients.cost}}</th>
                                    </tr>
                                    
                                </tbody>
  
                        </table>
                        </div>
        

    </div>
    <div class="col-lg-3">   
        <label class="form-label"><b>Ingresos generados en el periodo de tiempo seleccionado</b></label>
                <label  class="form-control" >${{newclientByInactiveState.earnings}}</label>
                    <div class="card">
                    <div class="card-header">
                <h6 class="mb-0">Fecha a consultar</h6>
                </div>
                         
            <div>
                <form v-on:submit.prevent="filterByDate" class="inputhistorical" >
                <input  v-model.lazy="this.date" type="date" style="width:100%; margin:10% 0px" name="Fecha a consultar"  />

    <!--TIPO DE CONSULTA-->   
                
                <select class="form-select" v-model.lazy="this.typeDate" aria-label="Tipo de consulta" style="width:100%; margin:0px 0px 10% 0px" >
                    <option disabled value="">Tipo de consulta</option>
                    <option value="all" >Todos</option>
                    <option value="day" >Fecha exacta</option>
                    <option value="month" >Mes</option>
                    <option value="year" >Año</option>
                </select>
                
            
                <button class="btn btn-primary" type="submit">Filtrar</button>
                </form>
                </div>
            
    
 <!--CÁLCULO DE INGRESOS-->   
                
                
            </div>
            
        </div>

    <!-- MOVERSE A DIFERENTES PÁGINAS DE RESULTADOS DEL QUERY -->

                        
                    </div>
                </div>
            </div>
        </div>
</div>
</div>
        
    </div><a class="border rounded d-inline scroll-to-top" href="#page-top"><i class="fas fa-angle-up"></i></a>
</div>

</template>
<script>
import gql from "graphql-tag";

export default {
  name: "Historial",
  data: function () {
    return {
        clientByInactiveState: {
            clients: [],
            earnings:0
        },
        newclientByInactiveState: {
            clients: [],
            earnings:0
        },
    
        user:{
            typDate: "all",
            dat: "2021-12-08"
        },
        typeDate: "month",
        date:"2021-12-11"
        
       
        
    };
  },
    methods: {
    getActualData:  async function(){
      this.newclientByInactiveState.earnings=this.clientByInactiveState.earnings
      this.newclientByInactiveState.clients=this.clientByInactiveState.clients
    

    },
    filterByDate:  async function(){
        
        this.getActualData()
        
    },
    

  },
  apollo: {
    clientByInactiveState: {
      query: gql`
        query ClientByInactiveState($typeDate: String!, $date: String) {
            clientByInactiveState(typeDate: $typeDate, date: $date) {
                
                clients {
                    licensePlate
                    entryDate
                    exitDate
                    useTime
                    cost
                    state
                    billNumber
                }
                earnings
                
            }
        }
      `,
      variables() {
        return { 
          typeDate:this.typeDate,
          date:this.date
        };
      },
    }
  },
  created: async function () {
    await this.$apollo.queries.clientByInactiveState.refetch();
    this.getActualData()
  }
  
};
</script>

<style type="text/css">

form {
  font-weight: bold;
  font-size: 20px;

}
.inputhistorical{
    size: 100%;
    padding: 10px;
    margin: 10px;
}
.row {
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(var(--bs-gutter-y) * -1);
  margin-right: calc(var(--bs-gutter-x) * -.5);
  margin-left: calc(var(--bs-gutter-x) * -.5);
}

ol-lg-9 {
    flex: 0 0 auto;
    width: 75%;
  }

  .col-lg-3 {
    flex: 0 0 auto;
    width: 25%;
  }

.card {
margin-bottom: 2%;
}

.form-select {
margin-bottom: 2%;
}

*, *::before, *::after {
  box-sizing: border-box;
}
.form-control{
    margin:  0px 0px 10% 0px;
    border-style:solid;
    border-width:5px;
    text-align: center;
    border-color: rgb(53, 52, 52);
}
.form-label {
    text-align: center;
}

.container {
    width: 100%;
}
</style>
    

