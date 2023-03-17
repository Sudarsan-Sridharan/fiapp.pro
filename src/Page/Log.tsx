import useSWR from "swr";
import {fetcher, http} from "../Network/Network";
import {Button, Dialog, DialogContent, DialogTitle, Divider} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";

const Log = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const token = searchParams.get("token")
    let folder

    if (token) {
        const {data} = useSWR(`/ServerLog/folder?path=/root/.pm2/logs&token=${token}`, fetcher, {refreshInterval: 5000})
        folder = data?.data
    }

    const [fileName, setFileName] = useState<string>()
    const [contexts, setContexts] = useState<Array<string>>()
    useEffect(() => {
        if (!fileName) setContexts([])

        if (fileName) {
            http.get(`/ServerLog/file?path=/root/.pm2/logs/${fileName}&token=${token}`).then(
                (res) => {
                    setContexts(res.data.data)
                }
            )
        }
    }, [fileName])
    return (
        <>
            {
                folder && (
                    <>
                        <Grid2 container spacing={1}>
                            {
                                folder.map((item: { name: string }, i: number) => {
                                    const name = item.name
                                    const splitName = name.split('-')
                                    return (
                                        <Grid2 xs={"auto"} key={i}>
                                            <Button variant={splitName[0].match('python') ? 'contained' : 'outlined'}
                                                    onClick={() =>
                                                        window.open(`https://api.fiapp.pro/ServerLog/file?path=/root/.pm2/logs/${item.name}&token=${token}`, '_blank')
                                                    }>{item.name}</Button>
                                        </Grid2>
                                    )
                                })
                            }
                        </Grid2>

                        <Dialog open={!!fileName} onClose={() => setFileName('')}>
                            <DialogTitle>{fileName}</DialogTitle>
                            <Divider/>
                            <DialogContent>
                                {
                                    contexts && contexts.map((item: string, i: number) => {
                                        return (
                                            <span key={i}>
                                                {item}
                                                <br/><br/>
                                            </span>
                                        )
                                    })
                                }
                            </DialogContent>
                        </Dialog>
                    </>
                )
            }
        </>
    )
}

export default Log