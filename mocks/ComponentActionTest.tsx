

export interface ComponentActionTest<T extends Object> {
    dataOrigin?: T,
}

export const ComponentActionTest = <T extends Object>({ dataOrigin }: ComponentActionTest<T>) => {



    return (
        <div data-test='content_root'>
            <h1 data-test='content_title' className="font-semibold">Content data</h1>
            {
                dataOrigin && <div data-test='content_data'>
                    <pre>

                        {
                            JSON.stringify(dataOrigin, null, 2)
                        }
                    </pre>
                </div>
            }
            {
                !dataOrigin && <div data-test='content_not_found' >
                    <p>Data not load</p>
                </div>
            }

        </div>
    )
}