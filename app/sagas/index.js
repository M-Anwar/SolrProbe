import { solrStatsAll } from './SolrStats';
import { fork, all} from 'redux-saga/effects';

export default function* rootSaga(){    
    yield all([
        fork(solrStatsAll)
    ])
}

