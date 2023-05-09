export default async function (req, res) {

    const response = await fetch('https://run.dingjunjie.com/v1/edits', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'authorization': req.headers.authorization,
        },
        body: JSON.stringify({
            model: 'text-davinci-edit-001',
            instruction: "Complete the information to make it more detailed",
            ...req.body,
        }),
    });
    const data = await response.json()
    res.status(200).json(data.choices.map((choice) => choice.text));
}