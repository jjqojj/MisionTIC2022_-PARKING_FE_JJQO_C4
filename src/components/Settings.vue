<template>
    <div class="SettingParking">
    <div class="container_SettingParking">
    
<section class="contact-clean" style="background: rgb(255,255,255); ">
        <form  v-on:submit.prevent="newUpdateSettings"  style="width: 500px;box-shadow: 0px 0px 12px 5px;">
            <h1 class="text-center" style="width: 450;color: rgb(0,122,255);font-weight: bold;font-family: Alatsi, sans-serif;">Configuraciones</h1>
            <h1 class="text-center" style="width: 450;color: rgb(0,122,255);font-weight: bold;font-family: Alatsi, sans-serif;">Parking System</h1>
            <label >Nombre Parqueadero:</label>
            <div style="transform: scale(1);border-radius: 0;border-top-width: 23px;padding: 0;margin: 22px;"></div><input class="form-control" v-model="getactualSettings.nameParking" type="text"  placeholder="Nombre Completo" name="name"  >
            <label >Administrador:</label>
            <div style="transform: scale(1);border-radius: 0;border-top-width: 23px;padding: 0;margin: 10px;"></div><input class="form-control" v-model="getactualSettings.admin" type="text"   name="admon" placeholder="Administrador" style="box-shadow: 0px 0px;">
            <label >Precio del minuto:</label>
            <div style="transform: scale(1);border-radius: 0;border-top-width: 23px;padding: 0;margin: 10px;"></div><input class="form-control" v-model="getactualSettings.minutePrice" type="number" name="cost"  placeholder="Costo minuto">
            <label >Capacidad:</label>
            <div style="transform: scale(1);border-radius: 0;border-top-width: 23px;padding: 0;margin: 10px;"></div><input class="form-control" v-model="getactualSettings.capacity" type="number" name="capacity" placeholder="Capacidad">
            <label >Prefijo Facturación:</label>
            <div style="transform: scale(1);border-radius: 0;border-top-width: 23px;padding: 0;margin: 10px;"></div><input class="form-control" v-model="getactualSettings.prefix" type="text" name="prefixBilling"  placeholder="Prefijo Factura" style="box-shadow: 0px 0px;" >
            <label >Inicio Facturación:</label>
            <div style="transform: scale(1);border-radius: 0;border-top-width: 23px;padding: 0;margin: 10px;"></div><input class="form-control" v-model="getactualSettings.billNumberInit" type="number" name="numStartBilling" placeholder="Inicio Factura">
            <label >Límite facturación:</label>
            <div style="transform: scale(1);border-radius: 0;border-top-width: 23px;padding: 0;margin: 10px;"></div><input class="form-control" v-model="getactualSettings.billNumberEnd" type="number" name="numEndBilling"   placeholder="Final Factura">
            <label >Última factura:</label>
            <div style="transform: scale(1);border-radius: 0;border-top-width: 23px;padding: 0;margin: 10px;"></div><input class="form-control" v-model="actualSettings.lastBillNumber" type="number" name="numEndBilling"   placeholder="Factura actual" disabled>
            <div style="transform: scale(1);border-radius: 0;border-top-width: 23px;padding: 0;margin: 1px;text-align: center;"><button class="btn btn-primary" type="submit" style="text-align: center;background: rgb(0,122,255);">Modificar</button></div>
        </form>
    </section>

    </div>
    </div>
</template>

<script>

import gql from "graphql-tag";
export default {
  name: "Settings",
  data: function () {
    return {
      
      actualSettings: {
          admin:"admin",
          nameParking:"parking",
          adressParking :"adress",
          minutePrice:0,
          capacity:0,
          prefix:"",
          billNumberInit:0,
          billNumberEnd:1,
          lastBillNumber:""
      },
      getactualSettings: {
          admin:"",
          nameParking:"",
          adressParking :"",
          minutePrice:0,
          capacity:0,
          prefix:"",
          billNumberInit:0,
          billNumberEnd:1,
         
          
      }
    };
  },
  methods: {
    updateSettings:  async function(){
        
        this.getactualSettings.admin=this.actualSettings.admin;
        this.getactualSettings.nameParking=this.actualSettings.nameParking;
        this.getactualSettings.adressParking =this.actualSettings.adressParking;
        this.getactualSettings.minutePrice=this.actualSettings.minutePrice;
        this.getactualSettings.capacity=this.actualSettings.capacity;
        this.getactualSettings.prefix=this.actualSettings.prefix;
        this.getactualSettings.billNumberInit=this.actualSettings.billNumberInit;
        this.getactualSettings.billNumberEnd=this.actualSettings.billNumberEnd;
        console.log(this.getactualSettings)
    },
    newUpdateSettings: async function() {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation UpdateSettings($settingsParking: SettingsParkingInput!) {
              updateSettings(settingsParking: $settingsParking) {
                capacity
                admin
                nameParking
                adressParking
                minutePrice
                prefix
                billNumberInit
                billNumberEnd
                lastBillNumber
              }
            }
          `,
          variables: {
            settingsParking: this.getactualSettings
          },
        })
        .then((result) => {
           
            
        })
        .catch((error) => {
          alert("error modificacion");
        })
        ;
    },
    


    

  },
  apollo: {
    actualSettings: {
      query: gql`
        query ActualSettings($user: String) {
          actualSettings(user: $user) {
            admin
            nameParking
            adressParking
            minutePrice
            capacity
            prefix
            billNumberInit
            billNumberEnd
            lastBillNumber
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
  created: async function () {
    await this.$apollo.queries.actualSettings.refetch();
    this.updateSettings();
  }
  
  
};
</script>




<style>
.contact-clean {
  background: #fafafa;
  padding: 80px 0;
}
@media (max-width:767px) {
  .contact-clean {
    padding: 20px 0;
  }
}
.contact-clean form {
  max-width: 480px;
  width: 90%;
  margin: 0 auto;
  background-color: #ffffff;
  padding: 40px;
  border-radius: 4px;
  color: #505e6c;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.1);
}
@media (max-width:767px) {
  .contact-clean form {
    padding: 30px;
  }
}
.contact-clean h2 {
  margin-top: 5px;
  font-weight: bold;
  font-size: 28px;
  margin-bottom: 36px;
  color: inherit;
}
.contact-clean form .form-control {
  background: #fff;
  border-radius: 2px;
  box-shadow: 1px 1px 1px rgba(0,0,0,0.05);
  outline: none;
  color: inherit;
  padding-left: 12px;
  height: 42px;
}
.contact-clean form .form-control:focus {
  border: 1px solid #b2b2b2;
}
.contact-clean form textarea.form-control {
  min-height: 100px;
  max-height: 260px;
  padding-top: 10px;
  resize: vertical;
}
.contact-clean form .btn {
  padding: 16px 32px;
  border: none;
  background: none;
  box-shadow: none;
  text-shadow: none;
  opacity: 0.9;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 13px;
  letter-spacing: 0.4px;
  line-height: 1;
  outline: none !important;
}
.contact-clean form .btn:hover {
  opacity: 1;
}
.contact-clean form .btn:active {
  transform: translateY(1px);
}
.contact-clean form .btn-primary {
  background-color: #055ada !important;
  margin-top: 15px;
  color: #fff;
}
</style>