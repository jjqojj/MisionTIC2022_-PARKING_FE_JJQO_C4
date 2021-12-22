<template>

  <section class="article-list">
    <section class="article-list">
        <div class="container"  onselectstart="return false;" >
            <div class="intro" >
                <h2 class="text-center" >Bienvenido</h2>
                <p class="text-center" style="font-size: 50px; margin:0px 0px 50px 0px">{{ userDetailById.username }}</p>
            </div>
            
        </div>
    </section>
        <div class="container">
            

<div class="container-fluid">            
<div class="row articles">
                <div class="col-sm-6 col-md-4 item" a style="background-color:#FAFAFA" href="#"> 
                    <h3 class="name">Configuracion</h3>
                    <p class="description">Personaliza el sistema ingresando información del parqueadero como nombre, dirección y datos del administrador. Así mismo configura el costo del servicio por minuto, capacidad del parqueadero y resolución de facturación DIAN</p>
                    <router-link class="action" to="Settings"><i class="fa fa-arrow-circle-right"></i></router-link>
                    <img src="..\assets\Conf.png" class="img-fluid" width="200" heigth="200" alt="No disponible">       
                                      
                    </div>

<!--VEHÍCULOS-->

                <div class="col-sm-6 col-md-4 item" a style="background-color:#EEEEEE" href="#"> 
                    <h3 class="name">Vehículos</h3>
                    <p class="description">Regístra el ingreso de los vehículos al parqueadero usando la placa del mismo y obten automáticamente el tiempo de uso y el costo total del servicio. También visualiza las plazas disponibles.</p>
                    <router-link class="action" to="Vehicles"><i class="fa fa-arrow-circle-right"></i></router-link>
                    <img src="..\assets\Veh.png" class="img-fluid" width="250" heigth="250" alt="No disponible">       
                    
                </div>

<!--HISTORIAL-->

                <div class="col-sm-6 col-md-4 item" a style="background-color:#FAFAFA" href="#"> 
                    <h3 class="name">Historial</h3>
                    <p class="description">Genera reportes de los vehículos que ingresaron al parqueadero por fecha, mes y año y visualiza los ingresos generados en el periodo seleccionado</p>
                   <router-link class="action" to="Historial"><i class="fa fa-arrow-circle-right" ></i></router-link>
                    <img src="..\assets\Hist.png" class="img-fluid" width="200" heigth="200" alt="No disponible">       
                    
                </div>
            </div>
</div>
        </div>
    </section>

  
  
</template>


<script>
import gql from "graphql-tag";
import jwt_decode from "jwt-decode";

export default {
  name: "Home",

  data: function () {
    return {
      userId: jwt_decode(localStorage.getItem("token_refresh")).user_id,
      userDetailById: {
        username: "",
        name: "",
        email: "",
      },
    };
  },

  apollo: {
    userDetailById: {
      query: gql`
        query ($userId: Int!) {
          userDetailById(userId: $userId) {
            username
            name
            email
          }
        }
      `,
      variables() {
        return {
          userId: this.userId,
        };
      }
    },
  }
};
</script>


<style >

.article-list {
  color: #313437;
  background-color: #fff;
}

.article-list p {
  color: #7d8285;
}

.article-list h2 {
  font-weight: bold;
  margin-bottom: 40px;
  padding-top: 40px;
  color: inherit;
}

@media (max-width:767px) {
  .article-list h2 {
    margin-bottom: 25px;
    padding-top: 25px;
    font-size: 24px;
  }
}

.article-list .intro {
  font-size: 16px;
  max-width: 500px;
  margin: 0 auto;
}

.article-list .intro p {
  margin-bottom: 0;
}

.article-list .articles {
  padding-bottom: 40px;
}

.article-list .item {
  padding-top: 50px;
  min-height: 425px;
  text-align: center;
}

.article-list .item .name {
  font-weight: bold;
  font-size: 16px;
  margin-top: 20px;
  color: inherit;
}

.article-list .item .description {
  font-size: 14px;
  margin-top: 15px;
  margin-bottom: 0;
}

.article-list .item .action {
  font-size: 24px;
  width: 24px;
  margin: 22px auto 0;
  line-height: 1;
  display: block;
  color: #4f86c3;
  opacity: 0.85;
  transition: opacity 0.2s;
  text-decoration: none;
}

.article-list .item .action:hover {
  opacity: 1;
}

</style>
    