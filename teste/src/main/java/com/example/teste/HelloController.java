package com.example.teste;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.TextField;
import javafx.scene.control.cell.PropertyValueFactory;

public class HelloController {

    @FXML
    private Label welcomeText;

    @FXML
    private TextField nomeField;
    @FXML
    private TextField descricaoField;
    @FXML
    private TextField precoField;
    @FXML
    private TextField quantidadeField;

    @FXML
    private TableView<Produto> tableView;
    @FXML
    private TableColumn<Produto, String> nomeCol;
    @FXML
    private TableColumn<Produto, String> descricaoCol;
    @FXML
    private TableColumn<Produto, Double> precoCol;
    @FXML
    private TableColumn<Produto, Integer> quantidadeCol;

    // Lista observável para armazenar os produtos
    private final ObservableList<Produto> produtos = FXCollections.observableArrayList();

    @FXML
    public void initialize() {
        // Vincula as colunas da tabela às propriedades da classe Produto
        nomeCol.setCellValueFactory(new PropertyValueFactory<>("nome"));
        descricaoCol.setCellValueFactory(new PropertyValueFactory<>("descricao"));
        precoCol.setCellValueFactory(new PropertyValueFactory<>("preco"));
        quantidadeCol.setCellValueFactory(new PropertyValueFactory<>("quantidade"));

        // Define a lista observável como o conteúdo da tabela
        tableView.setItems(produtos);
    }

    public void adicionarProduto(ActionEvent actionEvent) {
        // Captura os valores dos campos de entrada
        String nome = nomeField.getText();
        String descricao = descricaoField.getText();
        String precoText = precoField.getText();
        String quantidadeText = quantidadeField.getText();

        // Verificação básica dos campos
        if (nome.isEmpty() || descricao.isEmpty() || precoText.isEmpty() || quantidadeText.isEmpty()) {
            System.out.println("Por favor, preencha todos os campos.");
            return;
        }

        try {
            // Converte preço e quantidade para os tipos adequados
            double preco = Double.parseDouble(precoText);
            int quantidade = Integer.parseInt(quantidadeText);

            // Cria um novo produto e o adiciona à lista observável
            Produto produto = new Produto(nome, descricao, preco, quantidade);
            produtos.add(produto);

            System.out.println("Produto adicionado à tabela com sucesso!");

            // Limpa os campos após adicionar o produto
            nomeField.clear();
            descricaoField.clear();
            precoField.clear();
            quantidadeField.clear();

        } catch (NumberFormatException e) {
            System.out.println("Erro ao converter preço ou quantidade. Verifique os valores.");
        }
    }
}
