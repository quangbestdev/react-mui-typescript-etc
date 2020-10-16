import withApollo from '../../src/withApollo'
import Product from '../../src/views/Product'

export default withApollo({ ssr: true })(Product)
