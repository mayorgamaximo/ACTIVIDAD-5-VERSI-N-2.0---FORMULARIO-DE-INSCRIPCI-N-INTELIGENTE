<?php
header('Content-Type: text/html; charset=utf-8');
$mysqli = new mysqli("localhost", "root", "", "club_deportivo");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['nombre'] ?? 'No proporcionado';
    $apellido = $_POST['apellido'] ?? 'No proporcionado';
    $dni = $_POST['dni'] ?? 'No proporcionado';
    $telefono = $_POST['telefono'] ?? 'No proporcionado';
    $email = $_POST['email'] ?? 'No proporcionado';
    $edad = $_POST['edad'] ?? 0;
    
    // Procesar deportes seleccionados
    $deportes = isset($_POST['deportes']) ? implode(',', $_POST['deportes']) : '';

    // Insertar en la base de datos
    $stmt = $mysqli->prepare("INSERT INTO clientes (nombre, apellido, dni, telefono, mail, deportes, edad) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssi", $nombre, $apellido, $dni, $telefono, $email, $deportes, $edad);
    
    if ($stmt->execute()) {
        $response = [
            'success' => true,
            'message' => 'Inscripción exitosa!'
        ];
    } else {
        $response = [
            'success' => false,
            'message' => 'Error al guardar los datos: ' . $mysqli->error
        ];
    }

    $stmt->close();
    $mysqli->close();

    // Devolver respuesta como JSON
    header('Content-Type: application/json');
    echo json_encode($response);
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
}