package com.example.teste;

import java.sql.Connection;
import java.sql.Statement;
import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.stage.Stage;

import java.io.IOException;

public class HelloApplication extends Application {
    @Override
    public void start(Stage stage) throws IOException {
        FXMLLoader fxmlLoader = new FXMLLoader(HelloApplication.class.getResource("hello-view.fxml"));
        Scene scene = new Scene(fxmlLoader.load(), 320, 240);
        stage.setTitle("Hello!");
        stage.setScene(scene);
        stage.show();

        System.out.println("startZ.");
    }

    public static void main(String[] args) {
        launch();
    }

//    public static void createTable() {
//        String sql = "CREATE TABLE IF NOT EXISTS usuarios (\n"
//                + " id INTEGER PRIMARY KEY AUTOINCREMENT,\n"
//                + " nome TEXT NOT NULL,\n"
//                + " email TEXT NOT NULL\n"
//                + ");";
//
////        try (Connection conn = HelloController.connect();
////             Statement stmt = conn.createStatement()) {
////            stmt.execute(sql);
////            System.out.println("Tabela 'usuarios' criada.");
////        } catch (Exception e) {
////            System.out.println(e.getMessage());
////        }
//    }

}