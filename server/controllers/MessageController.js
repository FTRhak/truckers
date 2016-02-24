module.exports = function UserController() {
    this.actionMethods = [
        {
            action: "index",
            url: "/message/index",
            method: "get"
        }
    ];
    this.index = function (req, res) {
        res.json({message:'index'});
    };
};