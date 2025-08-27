<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

$apiKey = getenv("EQUILAR_API_KEY");
if (!$apiKey) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Missing API key',
        'message' => 'EQUILAR_API_KEY environment variable not set'
    ]);
    exit;
}

$url = "https://execatlas.equilar.com/bsp/profile/publicNewsFeed";

$payload = [
    "eventType" => [
        "REMOVED_FROM_WEBSITE",
        "RESIGNATION",
        "NEW_POSITION",
        "TITLE_CHANGE"
    ]
];

$ch = curl_init($url);

$headers = [
    'Content-Type: application/json',
    'Accept: application/json',
    'X-API-Key: ' . $apiKey
];

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

if ($error) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to fetch data',
        'message' => $error
    ]);
    exit;
}

if ($httpCode !== 200) {
    $errorData = json_decode($response, true);
    http_response_code($httpCode);
    echo json_encode([
        'error' => 'API request failed',
        'statusCode' => $httpCode,
        'response' => $errorData ?: $response,
        'message' => 'Check API authentication method'
    ]);
    exit;
}

echo $response;
?>
