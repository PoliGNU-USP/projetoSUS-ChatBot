package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/joho/godotenv"
	tele "gopkg.in/telebot.v3"
)

func sendToBotkit(c tele.Context) (string, error) {
	url := "http://localhost:3000/api/messages"

	// eu tava fazendo testes e o payload parecia que tinha que ser assim mas na real é bem mais simples
	// Create the payload you want to send
	// payload := map[string]interface{}{
	// 	"type":       "message",
	// 	"timestamp":  time.Now().Format(time.RFC3339),
	// 	"serviceUrl": url,
	// 	"id":         fmt.Sprintf("%d", c.Message().ID),
	// 	"channelId":  "telegram",
	// 	"from": map[string]interface{}{
	// 		"id":   fmt.Sprintf("%d", c.Sender().ID),
	// 		"name": c.Sender().Username,
	// 	},
	// 	"recipient": map[string]interface{}{
	// 		"id":   fmt.Sprintf("%d", c.Bot().Me.ID),
	// 		"name": c.Bot().Me.Username,
	// 	},
	// 	"conversation": map[string]interface{}{
	// 		"id": fmt.Sprintf("%d", c.Chat().ID),
	// 	},
	// 	"text": c.Message().Text,
	// }

	payload := map[string]string{
		"type":    "message",
		"text":    c.Message().Text,
		"channel": "webhook",
		"user":    string(c.Sender().ID),
	}
	// Marshal the payload to JSON
	jsonData, err := json.Marshal(payload)
	if err != nil {
		return "", fmt.Errorf("Error marshaling JSON: %v", err)
	}

	// Create a new POST request with the JSON payload
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	if err != nil {
		return "", fmt.Errorf("Error creating request: %v", err)
	}

	// Set the content type to application/json
	req.Header.Set("Content-Type", "application/json")

	// Log the payload and headers for debugging
	log.Printf("Payload: %s", string(jsonData))
	for key, value := range req.Header {
		log.Printf("Header: %s: %s", key, value)
	}

	// Send the request using http.DefaultClient
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return "", fmt.Errorf("Error sending request: %v", err)
	}
	defer resp.Body.Close()

	// Log the response status
	log.Printf("Response status: %s", resp.Status)

	// Read the response body
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", fmt.Errorf("Error reading response: %v", err)
	}

	// Log the response body for debugging
	log.Printf("Response body: %s", string(body))

	return string(body), nil
}

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Iniciando a conexão com o Telegram!")
	fmt.Println("Pegando as variáveis de ambiente!")

	pref := tele.Settings{
		Token:  os.Getenv("TELEGRAM_APITOKEN"),
		Poller: &tele.LongPoller{Timeout: 5 * time.Second},
	}

	bot, err := tele.NewBot(pref)
	if err != nil {
		log.Fatal(err)
	}

	bot.Handle(tele.OnText, func(ctx tele.Context) error {
		fmt.Println("Pegando a resposta com o botkit!")
		fmt.Printf("Recebi esse texto do Telegram %v\n", ctx.Text())
		fmt.Println("Enviando mensagem pro BotKit")

		resp, err := sendToBotkit(ctx)
		if err != nil {
			log.Fatal(err)
		}

		fmt.Printf("Mensagem recebida do BotKit: %v\n", resp)
		fmt.Println("Mandando resposta!")
		return ctx.Send(resp)
	})

	bot.Start()
}
