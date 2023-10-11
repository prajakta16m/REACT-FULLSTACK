module.exports = (sequelize, DataTypes) => {

    const Comments = sequelize.define("Comments", {
        
        commentBody: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    return Comments;
}