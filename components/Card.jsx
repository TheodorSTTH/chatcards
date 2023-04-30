export default function Card({cards, setCards, index}) {
    function removeCard() {
        setCards(prev => prev.map((card, i) => {
            if (i === index) return {
                question: card.question,
                answer: card.answer,
                removed: true
            }
            return card
        }))
    }
    return <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body">
            <div className="flex w-full">
                <div className="flex-grow card flex flex-col items-start">
                    <div className="flex justify-between w-full h-12">
                        <h2 className="card-title">Question</h2>
                    </div>
                    <input type="text" placeholder="Type your question here" className="my-8 input input-bordered w-full" 
                    value={cards[index].question} onChange={e => setCards(prev => prev.map((card, i) => {
                        if (i === index) return {
                            question: e.target.value,
                            answer: card.answer
                        }
                        return card
                    }))}
                    />
                </div>
                <div className="divider divider-horizontal"></div>
                <div className="flex-grow card flex flex-col items-start">
                    <div className="flex justify-between w-full h-12">
                        <h2 className="card-title">
                            Answer
                        </h2>
                        <button className="btn btn-ghost btn-circle btn-md" onClick={removeCard}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        </button>
                    </div>
                    <input type="text" placeholder="Type your answer here" className="my-8 input input-bordered w-full"
                    value={cards[index].answer} onChange={e => setCards(prev => prev.map((card, i) => {
                        if (i === index) return {
                            question: card.question,
                            answer: e.target.value
                        }
                        return card
                    }))}/>
                </div>
            </div>
        </div>
    </div>
}