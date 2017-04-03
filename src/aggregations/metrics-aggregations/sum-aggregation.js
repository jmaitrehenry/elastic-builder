'use strict';

const MetricsAggregationBase = require('./metrics-aggregation-base');

/**
 * A single-value metrics aggregation that sums up numeric values that are
 * extracted from the aggregated documents. These values can be extracted either
 * from specific numeric fields in the documents, or be generated by a
 * provided script.
 *
 *
 * [Elasticsearch reference](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-stats-aggregation.html)
 *
 * Aggregation that sums up numeric values that are extracted from the
 * aggregated documents.
 *
 * @extends MetricsAggregationBase
 */
class SumAggregation extends MetricsAggregationBase {

    /**
     * Creates an instance of `SumAggregation`
     *
     * @param {string} name The name which will be used to refer to this aggregation.
     * @param {string=} field The field to aggregate on
     */
    constructor(name, field) {
        super(name, 'sum', field);
    }
}

module.exports = SumAggregation;
