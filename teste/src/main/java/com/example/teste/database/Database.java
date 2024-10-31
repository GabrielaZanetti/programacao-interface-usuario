package com.example.teste.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.ResultSet;

public class Database {
    private static final String URL = "jdbc:sqlite:C:/Users/gabriela.zanetti/Desktop/produtos.db";

    public static Connection connect() throws SQLException {
        try {
            Class.forName("xerial.sqlite.jdbc"); // Carrega o driver SQLite
        } catch (ClassNotFoundException e) {
            System.out.println("Driver SQLite JDBC não encontrado: " + e.getMessage());
        }
        System.out.println("Conectando ao banco de dados...");
        return DriverManager.getConnection(URL);
    }

    public static void createTableAndInsertData() {
        String createTableSQL = "CREATE TABLE IF NOT EXISTS produtos (" +
                "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                "nome TEXT NOT NULL, " +
                "descricao TEXT, " +
                "preco REAL, " +
                "quantidade INTEGER)";
        try (Connection conn = connect(); Statement stmt = conn.createStatement()) {
            stmt.execute(createTableSQL);

            if (isTableEmpty(conn)) {
                insertInitialData(conn);
            }
        } catch (SQLException e) {
            System.out.println("Erro ao criar tabela ou inserir dados iniciais: " + e.getMessage());
        }
    }

    private static boolean isTableEmpty(Connection conn) throws SQLException {
        String checkSQL = "SELECT COUNT(*) AS total FROM produtos";
        try (Statement stmt = conn.createStatement(); ResultSet rs = stmt.executeQuery(checkSQL)) {
            return rs.next() && rs.getInt("total") == 0;
        }
    }

    private static void insertInitialData(Connection conn) throws SQLException {
        String[] initialData = {
                "INSERT INTO produtos (nome, descricao, preco, quantidade) VALUES ('Laptop', 'Laptop de alto desempenho', 3500.00, 10)",
                "INSERT INTO produtos (nome, descricao, preco, quantidade) VALUES ('Mouse', 'Mouse sem fio', 80.00, 50)",
                "INSERT INTO produtos (nome, descricao, preco, quantidade) VALUES ('Teclado', 'Teclado mecânico RGB', 200.00, 30)",
                "INSERT INTO produtos (nome, descricao, preco, quantidade) VALUES ('Monitor', 'Monitor Full HD 24 polegadas', 700.00, 20)",
                "INSERT INTO produtos (nome, descricao, preco, quantidade) VALUES ('Cadeira Gamer', 'Cadeira confortável para jogos', 1500.00, 5)"
        };

        try (Statement stmt = conn.createStatement()) {
            for (String sql : initialData) {
                stmt.execute(sql);
            }
            System.out.println("Dados iniciais inseridos com sucesso.");
        }
    }
}
