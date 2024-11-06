package com.example.teste;

import javafx.beans.property.SimpleDoubleProperty;
import javafx.beans.property.SimpleIntegerProperty;
import javafx.beans.property.SimpleStringProperty;
import javafx.beans.property.StringProperty;
import javafx.beans.property.DoubleProperty;
import javafx.beans.property.IntegerProperty;

public class Produto {
    private final StringProperty nome;
    private final StringProperty descricao;
    private final DoubleProperty preco;
    private final IntegerProperty quantidade;

    public Produto(String nome, String descricao, double preco, int quantidade) {
        this.nome = new SimpleStringProperty(nome);
        this.descricao = new SimpleStringProperty(descricao);
        this.preco = new SimpleDoubleProperty(preco);
        this.quantidade = new SimpleIntegerProperty(quantidade);
    }

    // Getters e setters para propriedades
    public StringProperty nomeProperty() { return nome; }
    public StringProperty descricaoProperty() { return descricao; }
    public DoubleProperty precoProperty() { return preco; }
    public IntegerProperty quantidadeProperty() { return quantidade; }

    // Métodos para obter valores
    public String getNome() { return nome.get(); }
    public String getDescricao() { return descricao.get(); }
    public double getPreco() { return preco.get(); }
    public int getQuantidade() { return quantidade.get(); }
}
