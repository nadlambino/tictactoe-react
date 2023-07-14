import './../styles/app.css'

export default function ServerMessage({messages}) {
    return messages && messages.map((message, i) =>
        <p key={i} className="server-message" dangerouslySetInnerHTML={{__html: message}} />
    )
}
