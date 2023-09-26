// Componente Vue
<template>
  <div>
    <div v-for="item in itens" :key="item.id">
      <h3>{{ item.nome }}</h3>
      <p>Preço: {{ item.preco }}</p>
      <button @click="adicionarAoCarrinho(item)">Adicionar ao carrinho</button>
    </div>

    <h2>Carrinho:</h2>
    <div v-for="item in carrinho" :key="item.id">
      <h3>{{ item.nome }}</h3>
      <p>Preço: {{ item.preco }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  data() {
    return {
      itens: [
        { id: 1, nome: 'Item 1', preco: 10 },
        { id: 2, nome: 'Item 2', preco: 20 },
        { id: 3, nome: 'Item 3', preco: 30 }
      ],
      carrinho: []
    };
  },
  methods: {
    adicionarAoCarrinho(item) {
      const itemCarrinho = { ...item };

      this.carrinho.push(itemCarrinho);
    }
  }
};
</script>
