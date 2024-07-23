FROM golang:1.22

WORKDIR /gateway

COPY go.mod go.sum ./

RUN go mod download

COPY *.go ./

ENV TELEGRAM_APITOKEN=6954524335:AAHutpLsR1DQmP6XUOutyTWA_hFODHZZcc0

RUN CGO_ENABLED=0 GOOS=linux go build -o /gateway-bin

CMD [ "/gateway-bin" ]
