<template>
  <div>
    <h2>Securité</h2>
    <div v-if="!isActivated">
      La sécurité est désactivée. <br/>
      <button type="button" class="activate" @click="activate()">ACTIVER</button>
    </div>
    <div v-else>
      La sécurité est ACTIVE. <br/>
      <button type="button" class="deactivate" @click="deactivate()">DESACTIVER</button>
    </div>
    <button type="button" @click="onCameraClickView('salon')">Camera salon</button>
    <button type="button" @click="onCameraClickView('bureau')">Camera bureau</button>
    <v-dialog v-model="viewCamera" >
      <v-card>
        <v-card-text><img :src="srcCamera"/></v-card-text>
        <v-card-actions><v-btn @click="viewCamera=false">Fermer</v-btn></v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import homeSecurityService from '../services/home-security-services'
  import secureService from '../services/secure-services'

  export default {
    name: 'home-security',
    data() {
      return {
        isActivated: false,
        viewCamera: false,
        srcCamera: ''
      }
    },
    async created() {
      this.isActivated = await homeSecurityService.isActivated();
    },
        
    methods: {
      async activate() {
        this.isActivated = await homeSecurityService.activate();
      },
      async deactivate() {
        let id = secureService.getTokenLogin();
        this.isActivated = !await homeSecurityService.deactivate(id);
      },
      onCameraClickView(place) {
        this.viewCamera = true;
        this.refreshImageCamera(place);
      },
      async refreshImageCamera(place) {
        if(!this.viewCamera) return;

        let path; 
        switch(place) {
          case 'salon':  path = "Salon"; break;
          case 'bureau': path = "Burea"; break;
        }
        try {
          const response = await secureService.secureFetch('api-home-security', '/secure/camera/camera_' + path + '.jpg');
          if(response.ok) {
            this.srcCamera = URL.createObjectURL(await response.blob());
            setTimeout(() => this.refreshImageCamera(place), 200);
          } else {
            console.error("Can't read image from network", response);
          }
        } catch(e) {
          console.error('Error while fetching', e);
        }
      }
    }
  }
</script>

<style scoped>
  #app button.activate {
    background-color: rgb(62, 110, 66); 
  }
  #app button.activate:hover {
    background-color: #4CAF50;
  }
    
  #app button.deactivate {
    background-color: rgb(138, 54, 54);
  }
  #app button.deactivate:hover {
    background-color: rgb(182, 56, 56);
  }
</style>
