function readDoc(){
  return [{baskets:{basket: {items:[{id:1, quantity:5}]}}}]
}

function patchDoc(){
}

const handler = async (req, res) => {
  if (req.query && req.query.token && req.query.token != 'aa2a-a3c09b3b-3a31-4f7d--331d12dda258') return
  const user = (req.session || {}).user
  if (!user) throw new Error('no user')
  product_id = (req.query || {}).product_id
  if (!product_id) throw new Error('no product id')

  const newItems = []
  const doc = await readDoc(user, req)
  if (doc && doc.baskets && doc.baskets.basket && doc.baskets.basket.items) {
    for (const item of doc.baskets.basket.items) {
      if (product_id === item.id) {
        item.quantity = item.quantity + 1
      }
      newItems.push(item)
    }
    doc.baskets.basket.items = newItems
    patchDoc(newItems)
  }
  res.send(doc)
}

handler({session: {user:1}, query:{product_id:1}}, {send: ()=>{}})