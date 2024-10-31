package com.example.teste;

import com.example.teste.database.Database;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Label;

import java.sql.SQLException;

public class HelloController {
    @FXML
    private Label welcomeText;

    @FXML
    protected void onHelloButtonClick() {
        welcomeText.setText("Welcome to JavaFX Application!");
    }

    public void adicionarProduto(ActionEvent actionEvent) throws SQLException {
        Database data = new Database();

        Database.connect();
        Database.createTableAndInsertData();



        System.out.println("aaaaaaaaaa");
    }
}