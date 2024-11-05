package com.example.teste;

import com.example.teste.database.Database;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Label;

import java.sql.SQLException;

public class HelloController {
    private static final String DB_URL = "jdbc:sqlite:produtos.db";

    public static Connection connect() {
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

    public static void main(String[] args) {
        createTable();
    }

    public void adicionarProduto(ActionEvent actionEvent) throws SQLException {
        Database data = new Database();

        Database.connect();
        Database.createTableAndInsertData();



        System.out.println("aaaaaaaaaa");
    }
}