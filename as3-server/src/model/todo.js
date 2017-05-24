if (!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
}

function list(unaccomplishedOnly = false, searchText = '', start) {
    const where = [];
    if (searchText)
        where.push(`text ILIKE '%$2:value%'`);
    if (start)
        where.push('id < $3');
    if (unaccomplishedOnly)
        where.push(` NOT ("doneTs" IS NOT NULL)`)
    
    const sql = `
        SELECT *
        FROM todos
        ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
        ORDER BY id DESC
        LIMIT 10
    `;
    
    return db.any(sql, [unaccomplishedOnly, searchText, start]);
}

function create(mood, text) {
    const sql = `
        INSERT INTO todos ($<this:name>)
        VALUES ($<mood>, $<text>)
        RETURNING *
    `;
    return db.one(sql, {mood, text});
}

function accom(postId) {
    const sql = `
        UPDATE todos
        SET "doneTs" = (extract(epoch from now()))
        WHERE id = $1
        RETURNING *
    `;
    return db.one(sql, postId);
}

module.exports = {
    list,
    create,
    accom
};
