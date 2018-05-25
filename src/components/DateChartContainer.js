import React from 'react'
import { render } from 'react-dom'
import { ResponsiveCalendar } from 'nivo'

// make sure parent container have a defined height when using responsive component,
// otherwise height will be 0 and no chart will be rendered.

const dataset = [
    {
      "day": "2016-02-04",
      "value": 135
    },
    {
      "day": "2016-06-04",
      "value": 334
    },
    {
      "day": "2015-08-10",
      "value": 261
    },
    {
      "day": "2015-10-29",
      "value": 70
    },
    {
      "day": "2015-04-22",
      "value": 43
    },
    {
      "day": "2015-08-18",
      "value": 224
    },
    {
      "day": "2015-11-03",
      "value": 115
    },
    {
      "day": "2015-10-04",
      "value": 338
    },
    {
      "day": "2016-04-21",
      "value": 164
    },
    {
      "day": "2016-05-01",
      "value": 226
    },
    {
      "day": "2015-09-01",
      "value": 168
    },
    {
      "day": "2015-10-30",
      "value": 155
    },
    {
      "day": "2016-01-13",
      "value": 257
    },
    {
      "day": "2015-08-16",
      "value": 161
    },
    {
      "day": "2015-09-16",
      "value": 286
    },
    {
      "day": "2015-04-03",
      "value": 275
    },
    {
      "day": "2015-04-25",
      "value": 329
    },
    {
      "day": "2015-12-24",
      "value": 313
    },
    {
      "day": "2015-10-03",
      "value": 143
    },
    {
      "day": "2015-04-06",
      "value": 208
    },
    {
      "day": "2015-05-31",
      "value": 152
    },
    {
      "day": "2016-04-28",
      "value": 182
    },
    {
      "day": "2015-10-11",
      "value": 329
    },
    {
      "day": "2016-03-05",
      "value": 74
    },
    {
      "day": "2016-01-08",
      "value": 329
    },
    {
      "day": "2016-03-15",
      "value": 369
    },
    {
      "day": "2015-12-13",
      "value": 166
    },
    {
      "day": "2016-01-17",
      "value": 375
    },
    {
      "day": "2016-03-04",
      "value": 301
    },
    {
      "day": "2015-10-09",
      "value": 256
    },
    {
      "day": "2015-07-21",
      "value": 20
    },
    {
      "day": "2016-04-29",
      "value": 337
    },
    {
      "day": "2016-05-20",
      "value": 99
    },
    {
      "day": "2016-07-04",
      "value": 285
    },
    {
      "day": "2015-08-12",
      "value": 105
    },
    {
      "day": "2015-04-21",
      "value": 341
    },
    {
      "day": "2016-01-20",
      "value": 165
    },
    {
      "day": "2015-12-29",
      "value": 246
    },
    {
      "day": "2016-06-18",
      "value": 262
    },
    {
      "day": "2016-05-14",
      "value": 59
    },
    {
      "day": "2016-05-18",
      "value": 298
    },
    {
      "day": "2016-01-21",
      "value": 170
    },
    {
      "day": "2015-08-20",
      "value": 77
    },
    {
      "day": "2015-09-10",
      "value": 193
    },
    {
      "day": "2015-04-13",
      "value": 97
    },
    {
      "day": "2016-05-04",
      "value": 300
    },
    {
      "day": "2016-02-12",
      "value": 23
    },
    {
      "day": "2015-04-09",
      "value": 159
    },
    {
      "day": "2015-11-07",
      "value": 143
    },
    {
      "day": "2016-01-01",
      "value": 233
    },
    {
      "day": "2016-07-11",
      "value": 240
    },
    {
      "day": "2016-05-02",
      "value": 399
    },
    {
      "day": "2015-05-01",
      "value": 266
    },
    {
      "day": "2015-06-12",
      "value": 129
    },
    {
      "day": "2015-05-26",
      "value": 36
    },
    {
      "day": "2015-07-15",
      "value": 51
    },
    {
      "day": "2016-03-19",
      "value": 371
    },
    {
      "day": "2015-10-22",
      "value": 189
    },
    {
      "day": "2015-08-17",
      "value": 365
    },
    {
      "day": "2016-07-18",
      "value": 12
    },
    {
      "day": "2015-06-15",
      "value": 7
    },
    {
      "day": "2016-02-07",
      "value": 295
    },
    {
      "day": "2016-01-25",
      "value": 285
    },
    {
      "day": "2016-01-15",
      "value": 172
    },
    {
      "day": "2015-10-23",
      "value": 265
    },
    {
      "day": "2016-08-10",
      "value": 96
    },
    {
      "day": "2016-02-24",
      "value": 380
    },
    {
      "day": "2015-10-07",
      "value": 46
    },
    {
      "day": "2016-07-15",
      "value": 52
    },
    {
      "day": "2015-12-25",
      "value": 150
    },
    {
      "day": "2016-01-18",
      "value": 30
    },
    {
      "day": "2015-08-29",
      "value": 339
    },
    {
      "day": "2015-07-16",
      "value": 74
    },
    {
      "day": "2016-02-08",
      "value": 111
    },
    {
      "day": "2016-01-10",
      "value": 99
    },
    {
      "day": "2015-12-19",
      "value": 13
    },
    {
      "day": "2015-08-21",
      "value": 302
    },
    {
      "day": "2015-04-04",
      "value": 89
    },
    {
      "day": "2016-07-12",
      "value": 26
    },
    {
      "day": "2015-11-13",
      "value": 122
    },
    {
      "day": "2015-07-28",
      "value": 37
    },
    {
      "day": "2016-06-20",
      "value": 111
    },
    {
      "day": "2016-01-30",
      "value": 396
    },
    {
      "day": "2016-04-08",
      "value": 390
    },
    {
      "day": "2016-06-21",
      "value": 340
    },
    {
      "day": "2016-06-12",
      "value": 383
    },
    {
      "day": "2015-07-13",
      "value": 155
    },
    {
      "day": "2015-05-07",
      "value": 392
    },
    {
      "day": "2016-07-08",
      "value": 366
    },
    {
      "day": "2016-07-03",
      "value": 230
    },
    {
      "day": "2015-07-12",
      "value": 54
    },
    {
      "day": "2016-02-15",
      "value": 397
    },
    {
      "day": "2015-10-21",
      "value": 38
    },
    {
      "day": "2015-07-06",
      "value": 19
    },
    {
      "day": "2015-10-12",
      "value": 315
    },
    {
      "day": "2015-12-03",
      "value": 95
    },
    {
      "day": "2016-06-23",
      "value": 230
    },
    {
      "day": "2015-09-15",
      "value": 14
    },
    {
      "day": "2015-10-28",
      "value": 300
    },
    {
      "day": "2015-07-19",
      "value": 25
    },
    {
      "day": "2015-08-27",
      "value": 44
    },
    {
      "day": "2016-04-24",
      "value": 309
    },
    {
      "day": "2016-04-02",
      "value": 197
    },
    {
      "day": "2015-09-07",
      "value": 180
    },
    {
      "day": "2015-11-28",
      "value": 80
    },
    {
      "day": "2015-04-02",
      "value": 112
    },
    {
      "day": "2015-06-07",
      "value": 263
    },
    {
      "day": "2016-03-17",
      "value": 304
    },
    {
      "day": "2015-12-23",
      "value": 193
    },
    {
      "day": "2015-06-02",
      "value": 194
    },
    {
      "day": "2015-06-11",
      "value": 328
    },
    {
      "day": "2015-11-23",
      "value": 111
    },
    {
      "day": "2015-04-18",
      "value": 61
    },
    {
      "day": "2015-10-10",
      "value": 177
    },
    {
      "day": "2015-11-21",
      "value": 56
    },
    {
      "day": "2016-02-21",
      "value": 294
    },
    {
      "day": "2016-01-03",
      "value": 350
    },
    {
      "day": "2016-08-02",
      "value": 171
    },
    {
      "day": "2015-06-10",
      "value": 220
    },
  ]
  

const Chart = (props) => (
    <ResponsiveCalendar
        data={dataset}
        from="2015-01-01"
        to="2015-12-12"
        emptyColor="#eeeeee"
        colors={[
            "#61cdbb",
            "#97e3d5",
            "#e8c1a0",
            "#f47560"
        ]}
        margin={{
            "top": 30,
            "right": 0,
            "bottom": 0,
            "left": 30
        }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        monthLegendOffset={10}
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
            {
                "anchor": "bottom-right",
                "direction": "row",
                "translateY": 36,
                "itemCount": 4,
                "itemWidth": 34,
                "itemHeight": 36,
                "itemDirection": "top-to-bottom"
            }
        ]}
    />
)

export default Chart
