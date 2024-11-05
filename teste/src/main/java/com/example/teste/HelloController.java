package com.example.teste;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.TableView;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TextField;
import javafx.scene.control.cell.PropertyValueFactory;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class HelloController {
    private static final String DB_URL = "jdbc:sqlite:produtos.db";

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

    private static Connection connect() {
        Connection conn = null;
        try {
            conn = DriverManager.getConnection(DB_URL);
            System.out.println("Conexão com o banco de dados estabelecida.");
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        return conn;
    }
    
    public static void createTable() {
        String sql = """
            CREATE TABLE IF NOT EXISTS produtos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                Nome TEXT NOT NULL,
                Descricao TEXT,
                Preco REAL,
                Quantidade INTEGER
            );
            """;

        try (Connection conn = connect(); Statement stmt = conn.createStatement()) {
            stmt.execute(sql);
            System.out.println("Tabela 'produtos' criada ou já existe.");
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }

    public void initialize() {
        nomeCol.setCellValueFactory(new PropertyValueFactory<>("nome"));
        descricaoCol.setCellValueFactory(new PropertyValueFactory<>("descricao"));
        precoCol.setCellValueFactory(new PropertyValueFactory<>("preco"));
        quantidadeCol.setCellValueFactory(new PropertyValueFactory<>("quantidade"));
        
        atualizarTabela();
    }

    public void adicionarProduto(ActionEvent actionEvent) {
        String nome = nomeField.getText();
        String descricao = descricaoField.getText();
        double preco = Double.parseDouble(precoField.getText());
        int quantidade = Integer.parseInt(quantidadeField.getText());

        String sql = "INSERT INTO produtos(Nome, Descricao, Preco, Quantidade) VALUES(?, ?, ?, ?)";

        try (Connection conn = connect(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, nome);
            pstmt.setString(2, descricao);
            pstmt.setDouble(3, preco);
            pstmt.setInt(4, quantidade);
            pstmt.executeUpdate();

            System.out.println("Produto adicionado com sucesso!");
            limparCampos();
            atualizarTabela();
        } catch (SQLException e) {
            System.out.println("Erro ao inserir produto: " + e.getMessage());
        }
    }

    private void limparCampos() {
        nomeField.clear();
        descricaoField.clear();
        precoField.clear();
        quantidadeField.clear();
    }

    private void atualizarTabela() {
        ObservableList<Produto> produtos = FXCollections.observableArrayList();
        
        String sql = "SELECT Nome, Descricao, Preco, Quantidade FROM produtos";

        try (Connection conn = connect(); Statement stmt = conn.createStatement(); ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                String nome = rs.getString("Nome");
                String descricao = rs.getString("Descricao");
                double preco = rs.getDouble("Preco");
                int quantidade = rs.getInt("Quantidade");

                produtos.add(new Produto(nome, descricao, preco, quantidade));
            }
            tableView.setItems(produtos);
        } catch (SQLException e) {
            System.out.println("Erro ao carregar produtos: " + e.getMessage());
        }
    }

}
