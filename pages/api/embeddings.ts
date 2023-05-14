
export default async function (req, res) {


    const response = await fetch('https://run.dingjunjie.com/v1/embeddings', {

        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'authorization': req.headers.authorization,
        },
        body: JSON.stringify({
            input: req.body.input,
            model: req.body.model,
        }),
    });

    const data = await response.json();
    const embeddedQuestion = data?.data[0]?.embedding

    res.status(200).json(embeddedQuestion);
    
}