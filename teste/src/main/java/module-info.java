module com.example.teste {
    requires javafx.controls;
    requires javafx.fxml;
    requires java.sql;


    opens com.example.teste to javafx.fxml;
    exports com.example.teste;
}