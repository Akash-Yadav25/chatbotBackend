
export const errorHandler = (err, req, res , next) =>{
    console.log('IN Error')
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
    })
}