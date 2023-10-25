const eventsContainer = document.querySelector("#eventsContainer")

const now = new Date();
const month = (now.getMonth() + 1).toString().padStart(2, '0')
const day = now.getDate().toString().padStart(2, '0')

$.get(`https://en.wikipedia.org/api/rest_v1/feed/onthisday/all/${month}/${day}`, ({ events }) => {

    const historicalEvents = {}

    for (const historicalEvent of events) {
        if (!historicalEvents[historicalEvent.year]) { historicalEvents[historicalEvent.year] = [] }
        historicalEvents[historicalEvent.year].push(historicalEvent.text)
    }

    for (const year in historicalEvents) {

        const eventContainer = document.createElement("div")
        eventContainer.className = "p-5 mb-5 rounded shadow-md"
        eventsContainer.prepend(eventContainer)

        const eventTitle = document.createElement("h1")
        eventTitle.className = "text-2xl mb-2"
        eventTitle.textContent = `${month}/${day}/${year}`
        eventContainer.appendChild(eventTitle)

        const list = document.createElement("ul")
        list.className = "pl-5 text-xl list-disc"
        for (const description of historicalEvents[year]) {
            const li = document.createElement("li")
            li.textContent = description
            list.appendChild(li)
        }
        eventContainer.appendChild(list)
    }
})





