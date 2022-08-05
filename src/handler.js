const { nanoid } = require("nanoid");
const notes = require("./notes");

/**
 * Menambahkan notes
 */
const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };
  notes.push(newNote);
  // console.log(newNote);
  // console.log(notes);

  // apakah notes berhasil tersimpan pada notes.js?
  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Catatan berhasil ditambahkan",
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Catatan gagal ditambahkan",
  });
  response.code(500);
  return response;
};

/**
 * menampilkan semua notes
 */
const getAllNotesHandler = () => ({
  status: "success",
  data: {
    notes,
  },
});

/**
 * menampilkan notes berdasarkan id
 */
const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((k) => k.id === id)[0];
  // jika notes ada
  if (note !== undefined) {
    const response = h.response({
      status: "success",
      data: {
        note,
      },
    });
    response.code(200);
    return response;
  }
  // notes tidak ada
  const response = h.response({
    status: "fail",
    message: "Catatan tidak ditemukan",
  });
  response.code(404);
  return response;
};

/**
 * mengedit notes berdasarkan id
 */
const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();

  // Buat sendiri
  // const note = notes.filter((k) => k.id === id)[0];
  // if (note !== undefined) {
  //   note.title = title;
  //   note.tags = tags;
  //   note.body = body;
  //   note.updatedAt = updatedAt;

  //   const response = h.response({
  //     status: "success",
  //     message: "Catatan berhasil diperbaharui",
  //   });
  //   response.code(200);
  //   return response;
  // }

  // from Dicoding
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    // console.log(notes[index]);
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
    // console.log(notes[index]);
    const response = h.response({
      status: "success",
      message: "Catatan berhasil diperbaharui",
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui catatan. Id catatan tidak ditemukan",
  });
  response.code(404);
  return response;
};

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Catatan berhasil dihapus",
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Catatan gagal dihapus. Id catatan tidak ditemukan",
  });
  response.code(404);
  return response;
};
module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
