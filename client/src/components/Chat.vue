<template>
  <div class="modal-overlay" @click="close">
    <div class="modal" @click.stop>
      <header class="modal-header">
        <h2>Chat em Tempo Real</h2>
        <button class="close-button" @click="close">&times;</button>
      </header>
      <main class="modal-body">
        <input v-model="mensagem" @keyup.enter="enviarMensagem" placeholder="Digite uma mensagem" />
        <button @click="enviarMensagem">Enviar</button>
        <ul class="chat-list">
          <li v-for="msg in mensagens" :key="msg">{{ msg }}</li>
        </ul>
        <div v-if="showConnectionStatus">
          <p>Conectado ao servidor!</p>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mensagem: '',
      mensagens: [],
      showConnectionStatus: false
    };
  },
  mounted() {
    this.$socket.on('connect', () => {
      console.log('Conectado ao servidor WebSocket');
      this.showConnectionStatus = true;
    });

    this.$socket.on('disconnect', () => {
      console.log('Desconectado do servidor WebSocket');
      this.showConnectionStatus = false;
    });

    this.$socket.on('mensagem', (data) => {
      this.mensagens.push(data);
    });
  },
  methods: {
    enviarMensagem() {
      if (this.mensagem.trim() !== '') {
        this.$socket.emit('mensagem', this.mensagem);
        this.mensagem = '';
      }
    },
    close() {
      //Somente para simular um modal, 
      //o evento é emitido e onde for colocado o componente tratar com uma função.
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  border-radius: 5px;
  width: 500px;
  max-width: 100%;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-body {
  padding-top: 20px;
}

.chat-list {
  list-style: none;
  padding: 0;
  max-height: 200px; /* Altura máxima da lista */
  overflow-y: auto; /* Adiciona uma barra de rolagem vertical */
}

input {
  width: calc(100% - 22px);
  margin-bottom: 10px;
  padding: 10px;
  box-sizing: border-box;
}

button {
  padding: 10px 20px;
}

p {
  background: lightgreen;
  padding: 10px;
  border-radius: 6px;
}

li {
  background: #f4f4f4;
  margin: 5px 0;
  padding: 10px;
  border-radius: 5px;
}
</style>