USE master;
GO
ALTER DATABASE coworkSpaces SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
GO
DROP DATABASE IF EXISTS coworkSpaces
GO
CREATE DATABASE coworkSpaces
GO
USE coworkSpaces
GO

/****** Object:  Table [dbo].[TBL_CARACTERISTICAS_ESPACIOS]    Script Date: 10/3/2021 14:38:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TBL_CARACTERISTICAS_ESPACIOS](
	[Id_Caracteristica][int] IDENTITY(1,1) NOT NULL,
	[Id_Espacio] [int] NULL,
	[Nombre] [nvarchar](50) NULL,
	[Descripcion] [nvarchar](500) NULL,
 CONSTRAINT [PK_TBL_CARACTERISTICAS_ESPACIOS] PRIMARY KEY CLUSTERED 
(
	[Id_Caracteristica] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TBL_CATEGORIAS]    Script Date: 10/3/2021 14:38:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TBL_CATEGORIAS](
	[Id_Categoria] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](50) NULL,
 CONSTRAINT [PK_TBL_CATEGORIAS] PRIMARY KEY CLUSTERED 
(
	[Id_Categoria] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TBL_CONTRASENNAS]    Script Date: 10/3/2021 14:38:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TBL_CONTRASENNAS](
	[Id_Contrasenna] [int] IDENTITY(1,1) NOT NULL,
	[Id_Usuario] [int] NULL,
	[Valor] [nvarchar](50) NULL,
	[Fecha_Creacion] [datetime] NULL,
 CONSTRAINT [PK_TBL_CONTRASENNAS] PRIMARY KEY CLUSTERED 
(
	[Id_Contrasenna] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TBL_DOCUMENTOS]    Script Date: 10/3/2021 14:38:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TBL_DOCUMENTOS](
	[Id_Documento] [int] IDENTITY(1,1) NOT NULL,
	[Id_Propiedad] [int] NULL,
	[URL] [nvarchar](150) NULL,
	[Tipo] [nvarchar](50) NULL,
	[Nombre] [nvarchar](50) NULL,
 CONSTRAINT [PK_TBL_DOCUMENTOS] PRIMARY KEY CLUSTERED 
(
	[Id_Documento] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[TBL_DOCUMENTOS_ESPACIO]    Script Date: 1/4/2021 12:19:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TBL_DOCUMENTOS_ESPACIO](
	[Id_Documento_Espacio] [int] IDENTITY(1,1) NOT NULL,
	[Id_Documento] [int] NULL,
	[Id_Espacio] [int] NULL
 CONSTRAINT [PK_TBL_DOCUMENTOS_ESPACIO] PRIMARY KEY CLUSTERED 
(
	[Id_Documento_ESPACIO] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[TBL_ESPACIO_CATEGORIA]    Script Date: 10/3/2021 14:38:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TBL_ESPACIO_CATEGORIA](
	[Id_Espacio] [int] NULL,
	[Id_Categoria] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TBL_ESPACIOS]    Script Date: 10/3/2021 14:38:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TBL_ESPACIOS](
	[Id_Espacio] [int] IDENTITY(1,1) NOT NULL,
	[Id_Propiedad] [int] NULL,
	[Id_Categoria] [int] NULL,
	[Nombre] [nvarchar](50) NULL,
	[Precio] [float] NULL,
	[Estado] [nvarchar](50) NULL,
	[Permite_Reembolso] [nvarchar](50) NULL,
	[Permite_Cancelacion] [nvarchar](50) NULL,
	[Tiempo_Minimo_Previo_Cancelacion] [int] NULL,
	[Tiempo_Minimo_Reservacion] [float] NULL,
[Mensaje_Reservacion] [nvarchar](400) NULL
 CONSTRAINT [PK_TBL_ESPACIOS] PRIMARY KEY CLUSTERED 
(
	[Id_Espacio] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TBL_FACTURAS]    Script Date: 10/3/2021 14:38:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TBL_FACTURAS](
	[Id_Factura] [int] IDENTITY(1,1) NOT NULL,
	[Id_Usuario] [int] NULL,
	[Fecha] [datetime] NULL,
	[Nombre_Usuario] [nvarchar](50) NULL,
[Detalle] [nvarchar](50) NULL,
 CONSTRAINT [PK_TBL_FACTURAS] PRIMARY KEY CLUSTERED 
(
	[Id_Factura] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TBL_HORARIOS]    Script Date: 10/3/2021 14:38:45 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[TBL_HORARIOS](
	[Id_Horario] [int] IDENTITY(1,1) NOT NULL,
	[Id_Espacio] [int] NULL,
	[Dia_Semana] [nvarchar](50) NULL,
	[Hora_Inicio] [time](7) NULL,
	[Hora_Fin] [time](7) NULL,
 CONSTRAINT [PK_TBL_HORARIOS] PRIMARY KEY CLUSTERED 
(
	[Id_Horario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[TBL_HORARIOS]  WITH CHECK ADD  CONSTRAINT [FK_TBL_HORARIOS_TBL_ESPACIOS] FOREIGN KEY([Id_Espacio])
REFERENCES [dbo].[TBL_ESPACIOS] ([Id_Espacio])
GO

ALTER TABLE [dbo].[TBL_HORARIOS] CHECK CONSTRAINT [FK_TBL_HORARIOS_TBL_ESPACIOS]
GO

/****** Object:  Table [dbo].[TBL_IMPUESTOS]    Script Date: 10/3/2021 14:38:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TBL_IMPUESTOS](
	[Id_Impuesto] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](50) NULL,
	[Valor] [float] NULL,
 CONSTRAINT [PK_TBL_IMPUESTOS] PRIMARY KEY CLUSTERED 
(
	[Id_Impuesto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TBL_LOGS]    Script Date: 10/3/2021 14:38:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TBL_LOGS](
	[Id_Log] [int] NOT NULL,
	[Id_Usuario] [int] NULL,
	[Fecha] [datetime] NULL,
	[Nombre_Accion] [nvarchar](50) NULL,
 CONSTRAINT [PK_TBL_LOGS] PRIMARY KEY CLUSTERED 
(
	[Id_Log] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TBL_MEMBRESIAS]    Script Date: 10/3/2021 14:38:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TBL_MEMBRESIAS](
	[Id_Membresia] [int] IDENTITY(1,1) NOT NULL,
	[Id_Usuario] [int] NULL,
	[Fecha_Ultimo_Pago] [datetime] NULL,
	[Comision_Admin] [float] NULL,
 CONSTRAINT [PK_TBL_MEMBRESIA] PRIMARY KEY CLUSTERED 
(
	[Id_Membresia] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TBL_MENSAJES]    Script Date: 10/3/2021 14:38:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TBL_MENSAJES](
	[Id_Mensaje] [int] IDENTITY(1,1) NOT NULL,
	[Id_Usuario_Emisor] [int] NULL,
	[Id_Usuario_Receptor] [int] NULL,
	[Texto] [nvarchar](MAX) NULL,
	[Fecha] [datetime] NULL,
 CONSTRAINT [PK_TBL_MENSAJES] PRIMARY KEY CLUSTERED 
(
	[Id_Mensaje] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TBL_PARAMETROS]    Script Date: 10/3/2021 14:38:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TBL_PARAMETROS](
	[Id_Parametro] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](50) NULL,
	[Valor] [nvarchar](MAX) NULL,
 CONSTRAINT [PK_TBL_PARAMETROS] PRIMARY KEY CLUSTERED 
(
	[Id_Parametro] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TBL_PROPIEDADES]    Script Date: 10/3/2021 14:38:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TBL_PROPIEDADES](
	[Id_Propiedad] [int] IDENTITY(1,1) NOT NULL,
	[Id_Usuario] [int] NULL,
	[Nombre] [nvarchar](50) NULL,
	[Estado] [nvarchar](50) NULL,
	[Descripcion] [nvarchar](MAX) NULL,
	[Latitud] [float] NULL,
	[Longitud] [float] NULL,
 CONSTRAINT [PK_TBL_PROPIEDADES] PRIMARY KEY CLUSTERED 
(
	[Id_Propiedad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TBL_RESERVACION]    Script Date: 10/3/2021 14:38:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TBL_RESERVACION](
	[Id_Reservacion] [int] IDENTITY(1,1) NOT NULL,
	[Id_Usuario] [int] NULL,
	[Id_Espacio] [int] NULL,
	[Fecha] [datetime] NULL,
	[Hora_Entrada] [time](7) NULL,
	[Hora_Salida] [time](7) NULL,
	[Calificacion_Usuario] [int] NULL,
	[Calificacion_Propietario] [int] NULL,
	[Calificacion_Propiedad] [int] NULL,
	[Monto] [float] NULL,
	[Estado] [nvarchar](50) NULL,
 CONSTRAINT [PK_TBL_RESERVACION] PRIMARY KEY CLUSTERED 
(
	[Id_Reservacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TBL_ROL_USUARIO]    Script Date: 10/3/2021 14:38:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TBL_ROL_USUARIO](
	[Id_Usuario] [int] NULL,
	[Id_Rol] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TBL_ROLES]    Script Date: 10/3/2021 14:38:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TBL_ROLES](
	[Id_Rol] [int] NOT NULL,
	[Nombre] [nvarchar](50) NULL,
 CONSTRAINT [PK_TBL_ROLES] PRIMARY KEY CLUSTERED 
(
	[Id_Rol] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TBL_SOLICITUDES]    Script Date: 10/3/2021 14:38:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TBL_SOLICITUDES](
	[Id_Solicitud] [int] IDENTITY(1,1) NOT NULL,
	[Id_Usuario] [int] NULL,
	[Revisada] [nvarchar](50) NULL,
	[Resultado] [nvarchar](50) NULL,
 CONSTRAINT [PK_TBL_SOLICITUDES] PRIMARY KEY CLUSTERED 
(
	[Id_Solicitud] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TBL_TRANSACCIONES]    Script Date: 10/3/2021 14:38:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TBL_TRANSACCIONES](
	[Id_Transaccion] [int] IDENTITY(1,1) NOT NULL,
	[Id_Factura] [int] NULL,
	[Tipo] [nvarchar](50) NULL,
	[Detalle] [nvarchar](50) NULL,
	[Monto] [float] NULL,
 CONSTRAINT [PK_TBL_TRANSACCIONES] PRIMARY KEY CLUSTERED 
(
	[Id_Transaccion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TBL_USUARIOS]    Script Date: 10/3/2021 14:38:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TBL_USUARIOS](
	[Id_Usuario] [int] IDENTITY(1,1) NOT NULL,
	[Email] [nvarchar](50) NULL,
	[Telefono] [nvarchar](50) NULL,
	[Identificacion] [nvarchar](50) NULL,
	[Tipo_Identificacion] [nvarchar](50) NULL,
	[Fecha_Creacion] [datetime] NULL,
	[Fecha_Nacimiento] [datetime] NULL,
	[URL_Foto] [nvarchar](150) NULL,
	[Nombre] [nvarchar](50) NULL,
	[Apellidos] [nvarchar](50) NULL,
	[Genero] [nvarchar](50) NULL,
	[Estado] [nvarchar](50) NULL,
	[Saldo] [float] NULL,
 CONSTRAINT [PK_TBL_USUARIOS] PRIMARY KEY CLUSTERED 
(
	[Id_Usuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
CREATE TABLE [dbo].[TBL_LIST_OPTIONS](
	[LIST_ID] [nvarchar](50) NOT NULL,
	[LIST_VALUE] [nvarchar](50) NOT NULL,
	[LIST_DESC] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_TBL_LIST_OPTIONS] PRIMARY KEY CLUSTERED 
(
	[LIST_ID] ASC,
	[LIST_VALUE] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
ALTER TABLE [dbo].[TBL_CARACTERISTICAS_ESPACIOS]  WITH CHECK ADD  CONSTRAINT [FK_TBL_CARACTERISTICAS_ESPACIOS_TBL_ESPACIOS] FOREIGN KEY([Id_Espacio])
REFERENCES [dbo].[TBL_ESPACIOS] ([Id_Espacio])
GO
ALTER TABLE [dbo].[TBL_CARACTERISTICAS_ESPACIOS] CHECK CONSTRAINT [FK_TBL_CARACTERISTICAS_ESPACIOS_TBL_ESPACIOS]
GO
ALTER TABLE [dbo].[TBL_CATEGORIAS]  WITH CHECK ADD  CONSTRAINT [FK_TBL_CATEGORIAS_TBL_CATEGORIAS] FOREIGN KEY([Id_Categoria])
REFERENCES [dbo].[TBL_CATEGORIAS] ([Id_Categoria])
GO
ALTER TABLE [dbo].[TBL_CATEGORIAS] CHECK CONSTRAINT [FK_TBL_CATEGORIAS_TBL_CATEGORIAS]
GO
ALTER TABLE [dbo].[TBL_CONTRASENNAS]  WITH CHECK ADD  CONSTRAINT [FK_TBL_CONTRASENNAS_TBL_CONTRASENNAS] FOREIGN KEY([Id_Usuario])
REFERENCES [dbo].[TBL_USUARIOS] ([Id_Usuario])
GO
ALTER TABLE [dbo].[TBL_CONTRASENNAS] CHECK CONSTRAINT [FK_TBL_CONTRASENNAS_TBL_CONTRASENNAS]
GO
ALTER TABLE [dbo].[TBL_DOCUMENTOS]  WITH CHECK ADD  CONSTRAINT [FK_TBL_DOCUMENTOS_TBL_PROPIEDADES] FOREIGN KEY([Id_Propiedad])
REFERENCES [dbo].[TBL_PROPIEDADES] ([Id_Propiedad])
GO
ALTER TABLE [dbo].[TBL_DOCUMENTOS] CHECK CONSTRAINT [FK_TBL_DOCUMENTOS_TBL_PROPIEDADES]
GO
ALTER TABLE [dbo].[TBL_ESPACIO_CATEGORIA]  WITH CHECK ADD  CONSTRAINT [FK_TBL_ESPACIO_CATEGORIA_TBL_CATEGORIAS] FOREIGN KEY([Id_Categoria])
REFERENCES [dbo].[TBL_CATEGORIAS] ([Id_Categoria])
GO
ALTER TABLE [dbo].[TBL_ESPACIO_CATEGORIA] CHECK CONSTRAINT [FK_TBL_ESPACIO_CATEGORIA_TBL_CATEGORIAS]
GO
ALTER TABLE [dbo].[TBL_ESPACIO_CATEGORIA]  WITH CHECK ADD  CONSTRAINT [FK_TBL_ESPACIO_CATEGORIA_TBL_ESPACIOS] FOREIGN KEY([Id_Espacio])
REFERENCES [dbo].[TBL_ESPACIOS] ([Id_Espacio])
GO
ALTER TABLE [dbo].[TBL_ESPACIO_CATEGORIA] CHECK CONSTRAINT [FK_TBL_ESPACIO_CATEGORIA_TBL_ESPACIOS]
GO
ALTER TABLE [dbo].[TBL_ESPACIOS]  WITH CHECK ADD  CONSTRAINT [FK_TBL_ESPACIOS_TBL_PROPIEDADES] FOREIGN KEY([Id_Propiedad])
REFERENCES [dbo].[TBL_PROPIEDADES] ([Id_Propiedad])
GO
ALTER TABLE [dbo].[TBL_ESPACIOS] CHECK CONSTRAINT [FK_TBL_ESPACIOS_TBL_PROPIEDADES]
GO
--CATEGORÍAS EN ESPACIOS FOREIGN KEY
ALTER TABLE [dbo].[TBL_ESPACIOS]  WITH CHECK ADD  CONSTRAINT [FK_TBL_ESPACIOS_TBL_CATEGORIAS] FOREIGN KEY([Id_Categoria])
REFERENCES [dbo].[TBL_CATEGORIAS] ([Id_Categoria])
GO
ALTER TABLE [dbo].[TBL_ESPACIOS] CHECK CONSTRAINT [FK_TBL_ESPACIOS_TBL_CATEGORIAS]
GO
ALTER TABLE [dbo].[TBL_FACTURAS]  WITH CHECK ADD  CONSTRAINT [FK_TBL_FACTURAS_TBL_USUARIOS] FOREIGN KEY([Id_Usuario])
REFERENCES [dbo].[TBL_USUARIOS] ([Id_Usuario])
GO
ALTER TABLE [dbo].[TBL_FACTURAS] CHECK CONSTRAINT [FK_TBL_FACTURAS_TBL_USUARIOS]
GO
ALTER TABLE [dbo].[TBL_LOGS]  WITH CHECK ADD  CONSTRAINT [FK_TBL_LOGS_TBL_USUARIOS] FOREIGN KEY([Id_Usuario])
REFERENCES [dbo].[TBL_USUARIOS] ([Id_Usuario])
GO
ALTER TABLE [dbo].[TBL_LOGS] CHECK CONSTRAINT [FK_TBL_LOGS_TBL_USUARIOS]
GO
ALTER TABLE [dbo].[TBL_MEMBRESIAS]  WITH CHECK ADD  CONSTRAINT [FK_TBL_MEMBRESIA_TBL_USUARIOS] FOREIGN KEY([Id_Usuario])
REFERENCES [dbo].[TBL_USUARIOS] ([Id_Usuario])
GO
ALTER TABLE [dbo].[TBL_MEMBRESIAS] CHECK CONSTRAINT [FK_TBL_MEMBRESIA_TBL_USUARIOS]
GO
ALTER TABLE [dbo].[TBL_MENSAJES]  WITH CHECK ADD  CONSTRAINT [FK_TBL_MENSAJES_TBL_USUARIOS] FOREIGN KEY([Id_Usuario_Emisor])
REFERENCES [dbo].[TBL_USUARIOS] ([Id_Usuario])
GO
ALTER TABLE [dbo].[TBL_MENSAJES] CHECK CONSTRAINT [FK_TBL_MENSAJES_TBL_USUARIOS]
GO
ALTER TABLE [dbo].[TBL_MENSAJES]  WITH CHECK ADD  CONSTRAINT [FK_TBL_MENSAJES_TBL_USUARIOS1] FOREIGN KEY([Id_Usuario_Receptor])
REFERENCES [dbo].[TBL_USUARIOS] ([Id_Usuario])
GO
ALTER TABLE [dbo].[TBL_MENSAJES] CHECK CONSTRAINT [FK_TBL_MENSAJES_TBL_USUARIOS1]
GO
ALTER TABLE [dbo].[TBL_PROPIEDADES]  WITH CHECK ADD  CONSTRAINT [FK_TBL_PROPIEDADES_TBL_USUARIOS] FOREIGN KEY([Id_Usuario])
REFERENCES [dbo].[TBL_USUARIOS] ([Id_Usuario])
GO
ALTER TABLE [dbo].[TBL_PROPIEDADES] CHECK CONSTRAINT [FK_TBL_PROPIEDADES_TBL_USUARIOS]
GO
ALTER TABLE [dbo].[TBL_RESERVACION]  WITH CHECK ADD  CONSTRAINT [FK_TBL_RESERVACION_TBL_ESPACIOS] FOREIGN KEY([Id_Espacio])
REFERENCES [dbo].[TBL_ESPACIOS] ([Id_Espacio])
GO
ALTER TABLE [dbo].[TBL_RESERVACION] CHECK CONSTRAINT [FK_TBL_RESERVACION_TBL_ESPACIOS]
GO
ALTER TABLE [dbo].[TBL_RESERVACION]  WITH CHECK ADD  CONSTRAINT [FK_TBL_RESERVACION_TBL_USUARIOS] FOREIGN KEY([Id_Usuario])
REFERENCES [dbo].[TBL_USUARIOS] ([Id_Usuario])
GO
ALTER TABLE [dbo].[TBL_RESERVACION] CHECK CONSTRAINT [FK_TBL_RESERVACION_TBL_USUARIOS]
GO
ALTER TABLE [dbo].[TBL_ROL_USUARIO]  WITH CHECK ADD  CONSTRAINT [FK_TBL_ROL_USUARIO_TBL_ROLES] FOREIGN KEY([Id_Rol])
REFERENCES [dbo].[TBL_ROLES] ([Id_Rol])
GO
ALTER TABLE [dbo].[TBL_ROL_USUARIO] CHECK CONSTRAINT [FK_TBL_ROL_USUARIO_TBL_ROLES]
GO
ALTER TABLE [dbo].[TBL_ROL_USUARIO]  WITH CHECK ADD  CONSTRAINT [FK_TBL_ROL_USUARIO_TBL_USUARIOS] FOREIGN KEY([Id_Usuario])
REFERENCES [dbo].[TBL_USUARIOS] ([Id_Usuario])
GO
ALTER TABLE [dbo].[TBL_ROL_USUARIO] CHECK CONSTRAINT [FK_TBL_ROL_USUARIO_TBL_USUARIOS]
GO
ALTER TABLE [dbo].[TBL_SOLICITUDES]  WITH CHECK ADD  CONSTRAINT [FK_TBL_SOLICITUDES_TBL_USUARIOS] FOREIGN KEY([Id_Usuario])
REFERENCES [dbo].[TBL_USUARIOS] ([Id_Usuario])
GO
ALTER TABLE [dbo].[TBL_SOLICITUDES] CHECK CONSTRAINT [FK_TBL_SOLICITUDES_TBL_USUARIOS]
GO
ALTER TABLE [dbo].[TBL_TRANSACCIONES]  WITH CHECK ADD  CONSTRAINT [FK_TBL_TRANSACCIONES_TBL_FACTURAS] FOREIGN KEY([Id_Factura])
REFERENCES [dbo].[TBL_FACTURAS] ([Id_Factura])
GO
ALTER TABLE [dbo].[TBL_TRANSACCIONES] CHECK CONSTRAINT [FK_TBL_TRANSACCIONES_TBL_FACTURAS]
GO
USE [master]
GO
ALTER DATABASE [coworkSpaces] SET  READ_WRITE 
GO
USE [coworkSpaces]

INSERT INTO TBL_ROLES(Id_Rol, Nombre) VALUES (1,'admin');
INSERT INTO TBL_ROLES(Id_Rol, Nombre) VALUES (2,'propietario');
INSERT INTO TBL_ROLES(Id_Rol, Nombre) VALUES (3,'final');

INSERT INTO TBL_LIST_OPTIONS(LIST_ID, LIST_VALUE, LIST_DESC) VALUES ('LST_GENERO','Masculino', 'Masculino');
INSERT INTO TBL_LIST_OPTIONS(LIST_ID, LIST_VALUE, LIST_DESC) VALUES ('LST_GENERO','Femenino', 'Femenino');
INSERT INTO TBL_LIST_OPTIONS(LIST_ID, LIST_VALUE, LIST_DESC) VALUES ('LST_GENERO','Otro', 'Otro');

INSERT INTO TBL_LIST_OPTIONS(LIST_ID, LIST_VALUE, LIST_DESC) VALUES ('LST_PAGOS','PayPal', 'PayPal');
INSERT INTO TBL_LIST_OPTIONS(LIST_ID, LIST_VALUE, LIST_DESC) VALUES ('LST_PAGOS','SINPE', 'SINPE');

INSERT INTO TBL_LIST_OPTIONS(LIST_ID, LIST_VALUE, LIST_DESC) VALUES ('LST_IDENTIFICACION','Cédula', 'Cédula');
INSERT INTO TBL_LIST_OPTIONS(LIST_ID, LIST_VALUE, LIST_DESC) VALUES ('LST_IDENTIFICACION','Cédula residencia', 'Cédula residencia');
INSERT INTO TBL_LIST_OPTIONS(LIST_ID, LIST_VALUE, LIST_DESC) VALUES ('LST_IDENTIFICACION','DIMEX', 'DIMEX');

--INSERT INTO TBL_LIST_OPTIONS(LIST_ID, LIST_VALUE, LIST_DESC) VALUES ('LST_ROL','1', 'Crear un nuevo administrador de la aplicación');
INSERT INTO TBL_LIST_OPTIONS(LIST_ID, LIST_VALUE, LIST_DESC) VALUES ('LST_ROL','2', 'Ofrecer mis espacios de trabajo a nuevos clientes');
INSERT INTO TBL_LIST_OPTIONS(LIST_ID, LIST_VALUE, LIST_DESC) VALUES ('LST_ROL','3', 'Encontrar y reservar nuevos espacios de trabajo');

INSERT INTO TBL_LIST_OPTIONS(LIST_ID, LIST_VALUE, LIST_DESC) VALUES ('LST_ESTADO_USUARIOS','activo', 'Activo');
INSERT INTO TBL_LIST_OPTIONS(LIST_ID, LIST_VALUE, LIST_DESC) VALUES ('LST_ESTADO_USUARIOS','inactivo', 'Inactivo');

INSERT INTO TBL_LIST_OPTIONS(LIST_ID, LIST_VALUE, LIST_DESC) VALUES ('LST_ESTADO_PROPIEDADES','activa', 'Activo');
INSERT INTO TBL_LIST_OPTIONS(LIST_ID, LIST_VALUE, LIST_DESC) VALUES ('LST_ESTADO_PROPIEDADES','inactiva', 'Inactivo');


INSERT INTO TBL_LIST_OPTIONS(LIST_ID, LIST_VALUE, LIST_DESC) VALUES ('LST_VALOR_PARAMETRO','Precio Membresia', 'Precio Membresia');
INSERT INTO TBL_LIST_OPTIONS(LIST_ID, LIST_VALUE, LIST_DESC) VALUES ('LST_VALOR_PARAMETRO','Terminos y Condiciones', 'Términos y Condiciones');
INSERT INTO TBL_LIST_OPTIONS(LIST_ID, LIST_VALUE, LIST_DESC) VALUES ('LST_DIA_DE_SEMANA','Lunes', 'Lunes');
INSERT INTO TBL_LIST_OPTIONS(LIST_ID, LIST_VALUE, LIST_DESC) VALUES ('LST_DIA_DE_SEMANA','Martes', 'Martes');
INSERT INTO TBL_LIST_OPTIONS(LIST_ID, LIST_VALUE, LIST_DESC) VALUES ('LST_DIA_DE_SEMANA','Miércoles', 'Miércoles');
INSERT INTO TBL_LIST_OPTIONS(LIST_ID, LIST_VALUE, LIST_DESC) VALUES ('LST_DIA_DE_SEMANA','Jueves', 'Jueves');
INSERT INTO TBL_LIST_OPTIONS(LIST_ID, LIST_VALUE, LIST_DESC) VALUES ('LST_DIA_DE_SEMANA','Viernes', 'Viernes');
INSERT INTO TBL_LIST_OPTIONS(LIST_ID, LIST_VALUE, LIST_DESC) VALUES ('LST_DIA_DE_SEMANA','Sábado', 'Sábado');
INSERT INTO TBL_LIST_OPTIONS(LIST_ID, LIST_VALUE, LIST_DESC) VALUES ('LST_DIA_DE_SEMANA','Domingo', 'Domingo');


INSERT INTO TBL_IMPUESTOS(Nombre, Valor) VALUES ('IVA',12);
INSERT INTO TBL_PARAMETROS(Nombre, Valor) VALUES ('Precio Membresia',15000);
INSERT INTO TBL_PARAMETROS(Nombre, Valor) VALUES ('Términos y Condiciones','La Plataforma Coworkspaces ofrece un sitio en línea que permite a los usuarios publicar, ofrecer, buscar y reservar servicios. Los Miembros que publican y ofrecen servicios son “Anfitriones”, mientras que los miembros que buscan, reservan o utilizan servicios son “Huéspedes.” Los Anfitriones ofrecen alojamientos (“Alojamientos”), actividades, excursiones y eventos (“Experiencias”), si como una variedad de servicios de viaje y de otro tipo (colectivamente, “Servicios del Anfitrión,” y cada oferta de un Servicio del Anfitrión, un “Anuncio”). Usted debe registrar una cuenta para acceder y utilizar muchas funciones de la Plataforma Coworkspaces, así como procurar que la información de la cuenta sea precisa. Como proveedor de la Plataforma Coworkspaces, Coworkspaces no posee, controla, ofrece ni administra ningún Anuncio o Servicio del Anfitrión. Coworkspaces no es parte en los contratos celebrados directamente entre los Anfitriones y los Huéspedes, ni tampoco es agente inmobiliario ni asegurador. Coworkspaces no actúa como agente de ningún Miembro, excepto según lo especificado en los Términos del Servicio de Pagos (“Términos de Pago”). Para obtener más información acerca de la función de Coworkspaces, consulte la Sección 16.');

INSERT INTO TBL_CATEGORIAS(Nombre) VALUES ('Salas de reuniones');
INSERT INTO TBL_CATEGORIAS(Nombre) VALUES ('Oficinas');
INSERT INTO TBL_CATEGORIAS(Nombre) VALUES ('Salas de entretenimiento');
INSERT INTO TBL_CATEGORIAS(Nombre) VALUES ('Cocina');
INSERT INTO TBL_CATEGORIAS(Nombre) VALUES ('Auditorios');

INSERT INTO TBL_LIST_OPTIONS(LIST_ID, LIST_VALUE, LIST_DESC) VALUES ('LST_ESTADO_ESPACIOS','activo', 'Activo');
INSERT INTO TBL_LIST_OPTIONS(LIST_ID, LIST_VALUE, LIST_DESC) VALUES ('LST_ESTADO_ESPACIOS','inactivo', 'Inactivo');


INSERT INTO TBL_LIST_OPTIONS(LIST_ID, LIST_VALUE, LIST_DESC) VALUES ('LST_ESTADO_CANCELACION','true', 'Permite cancelar');
INSERT INTO TBL_LIST_OPTIONS(LIST_ID, LIST_VALUE, LIST_DESC) VALUES ('LST_ESTADO_CANCELACION','false', 'No permite cancelar');

INSERT INTO TBL_LIST_OPTIONS(LIST_ID, LIST_VALUE, LIST_DESC) VALUES ('LST_ESTADO_REEMBOLSO','true', 'Permite reembolso');
INSERT INTO TBL_LIST_OPTIONS(LIST_ID, LIST_VALUE, LIST_DESC) VALUES ('LST_ESTADO_REEMBOLSO','false', 'No permite reembolso');


INSERT INTO TBL_USUARIOS(Email, Telefono, Identificacion, Tipo_Identificacion,Fecha_Creacion,Fecha_Nacimiento,URL_Foto,Nombre,Apellidos,Genero,Estado,Saldo) 
	VALUES('pocampov@ucenfotec.ac.cr','+50688367187','11895747','Cédula','2021-04-01','1998-07-19', 'https://res.cloudinary.com/imgproyecto1/image/upload/v1618533622/suyzfhrrlz1wkwa5qajd.jpg','John','Doe','Masculino','activo',0);

INSERT INTO TBL_CONTRASENNAS(Id_Usuario,Valor,Fecha_Creacion) 
	VALUES('1','564b82578a951ba5bac5b88261630bbf','2021-04-01');

INSERT INTO TBL_ROL_USUARIO(Id_Usuario,Id_Rol) 
	VALUES('1','1');

GO

--USUARIOS
--INSERT 
CREATE PROCEDURE [dbo].[CRE_USUARIO_PR]
	@P_Email [nvarchar](50),
	@P_Telefono [nvarchar](50),
	@P_Identificacion [nvarchar](50),
	@P_Tipo_Identificacion [nvarchar](50),
	@P_Fecha_Creacion [datetime],
	@P_Fecha_Nacimiento [datetime],
	@P_URL_Foto [nvarchar](150),
	@P_Nombre [nvarchar](50),
	@P_Apellidos [nvarchar](50),
	@P_Genero [nvarchar](50),
	@P_Estado [nvarchar](50),
	@P_Saldo [float]
AS
	INSERT INTO [dbo].[TBL_USUARIOS] 
	VALUES(@P_Email,@P_Telefono,@P_Identificacion,@P_Tipo_Identificacion,@P_Fecha_Creacion,@P_Fecha_Nacimiento,@P_URL_Foto,@P_Nombre,@P_Apellidos,
	@P_Genero,@P_Estado,@P_Saldo);
GO

--RET  BY ID
CREATE PROCEDURE [dbo].[RET_USUARIO_PR]
	@P_Id_Usuario [int]
AS
	SELECT Id_Usuario,Email,Telefono,Identificacion,Tipo_Identificacion,Fecha_Creacion,Fecha_Nacimiento,URL_Foto,Nombre,Apellidos,Genero,Estado,Saldo FROM TBL_USUARIOS WHERE Id_Usuario = @P_Id_Usuario;

GO

--RETRIEVE ALL 
CREATE PROCEDURE [dbo].[RET_ALL_USUARIO_PR]
AS
	SELECT Id_Usuario,Email,Telefono,Identificacion,Tipo_Identificacion,Fecha_Creacion,Fecha_Nacimiento,URL_Foto,Nombre,Apellidos,Genero,Estado,Saldo FROM TBL_USUARIOS;

GO

--UPDATE 
CREATE PROCEDURE [dbo].[UPD_USUARIO_PR]
    @P_Id_Usuario [int],
    @P_Email [nvarchar](50),
	@P_Telefono [nvarchar](50),
	@P_Identificacion [nvarchar](50),
	@P_Tipo_Identificacion [nvarchar](50),
	@P_Fecha_Creacion [datetime],
	@P_Fecha_Nacimiento [datetime],
	@P_URL_Foto [nvarchar](150),
	@P_Nombre [nvarchar](50),
	@P_Apellidos [nvarchar](50),
	@P_Genero [nvarchar](50),
	@P_Estado [nvarchar](50),
	@P_Saldo [float]
AS
	UPDATE [dbo].[TBL_USUARIOS] SET 
	Email = @P_Email, 
	Telefono = @P_Telefono, 
	Identificacion = @P_Identificacion, 
	Tipo_Identificacion = @P_Tipo_Identificacion, 
	Fecha_Creacion = @P_Fecha_Creacion, 
	Fecha_Nacimiento = @P_Fecha_Nacimiento, 
	URL_Foto = @P_URL_Foto, 
	Nombre = @P_Nombre, 
	Apellidos = @P_Apellidos, 
	Genero = @P_Genero, 
	Estado = @P_Estado, 
	Saldo = @P_Saldo
	WHERE Id_Usuario = @P_Id_Usuario;
GO

--DELETE 
CREATE PROCEDURE [dbo].[DEL_USUARIO_PR]
	@P_Id_Usuario [int]
AS
	DELETE FROM TBL_USUARIOS WHERE Id_Usuario = @P_Id_Usuario;


GO
--MEMBRESIAS
--INSERT 
CREATE PROCEDURE [dbo].[CRE_MEMBRESIA_PR]
	@P_Id_Usuario [int],
	@P_Fecha_Ultimo_Pago [datetime],
	@P_Comision_Admin [float]
AS
	INSERT INTO [dbo].[TBL_MEMBRESIAS] 
	VALUES(@P_Id_Usuario,@P_Fecha_Ultimo_Pago,@P_Comision_Admin);
GO

--RET  BY ID 
CREATE PROCEDURE [dbo].[RET_MEMBRESIA_PR]
	 @P_Id_Usuario [int]
AS
	SELECT Id_Membresia,Id_Usuario,Fecha_Ultimo_Pago,Comision_Admin FROM TBL_MEMBRESIAS WHERE Id_Usuario = @P_Id_Usuario;

GO

--RET  BY ID Usuario
CREATE PROCEDURE [dbo].[RET__MEMBRESIA_BY_ID_USUARIO_PR]
	@P_Id_Usuario [int]
AS
	SELECT Id_Membresia,Id_Usuario,Fecha_Ultimo_Pago,Comision_Admin FROM TBL_MEMBRESIAS WHERE Id_Usuario = @P_Id_Usuario;

GO

--RETRIEVE ALL 
CREATE PROCEDURE [dbo].[RET_ALL_MEMBRESIA_PR]
AS
	SELECT Id_Membresia,Id_Usuario,Fecha_Ultimo_Pago,Comision_Admin FROM TBL_MEMBRESIAS;

GO

--UPDATE 
CREATE PROCEDURE [dbo].[UPD_MEMBRESIA_PR]
    @P_Id_Membresia [int],
    @P_Id_Usuario [int],
	@P_Fecha_Ultimo_Pago [datetime],
	@P_Comision_Admin [float]
AS
	UPDATE [dbo].[TBL_MEMBRESIAS] SET 
	Id_Usuario = @P_Id_Usuario, 
	Fecha_Ultimo_Pago = @P_Fecha_Ultimo_Pago, 
	Comision_Admin = @P_Comision_Admin
	WHERE Id_Membresia = @P_Id_Membresia;
GO

--DELETE 
CREATE PROCEDURE [dbo].[DEL_MEMBRESIA_PR]
	    @P_Id_Membresia [int]
AS
	DELETE FROM TBL_MEMBRESIAS WHERE Id_Membresia = @P_Id_Membresia;
GO



--FACTURAS
--INSERT 
CREATE PROCEDURE [dbo].[CRE_FACTURA_PR]
	@P_Id_Usuario [int],
	@P_Fecha [datetime],
	@P_Nombre_Usuario [nvarchar](50),
	@P_Detalle [nvarchar](50)
AS
	INSERT INTO [dbo].[TBL_FACTURAS] 
	VALUES(@P_Id_Usuario,@P_Fecha,@P_Nombre_Usuario,@P_Detalle);
GO

--RET  BY ID 
CREATE PROCEDURE [dbo].[RET_FACTURA_PR]
	 @P_Id_Factura [int]
AS
	SELECT Id_Factura,Id_Usuario,Fecha,Nombre_Usuario,Detalle FROM TBL_FACTURAS WHERE Id_Factura = @P_Id_Factura;

GO

--RET  BY ID USUARIO
CREATE PROCEDURE [dbo].[RET_FACTURA_BY_ID_USUARIO_PR]
	 @P_Id_Usuario [int]
AS
	SELECT Id_Factura,Id_Usuario,Fecha,Nombre_Usuario,Detalle FROM TBL_FACTURAS WHERE Id_Usuario = @P_Id_Usuario;

GO

--RETRIEVE ALL 
CREATE PROCEDURE [dbo].[RET_ALL_FACTURA_PR]
AS
	SELECT Id_Factura,Id_Usuario,Fecha,Nombre_Usuario,Detalle FROM TBL_FACTURAS;

GO

--UPDATE 
CREATE PROCEDURE [dbo].[UPD_FACTURA_PR]
    @P_Id_Factura [int],
    @P_Id_Usuario [int],
	@P_Fecha [datetime],
	@P_Nombre_Usuario [nvarchar](50),
	@P_Detalle [nvarchar](50)
AS
	UPDATE [dbo].[TBL_FACTURAS] SET 
	Id_Usuario = @P_Id_Usuario, 
	Fecha = @P_Fecha, 
	Nombre_Usuario = @P_Nombre_Usuario,
	Detalle = @P_Detalle
	WHERE Id_Factura = @P_Id_Factura;
GO

--DELETE 
CREATE PROCEDURE [dbo].[DEL_FACTURA_PR]
	    @P_Id_Factura [int]
AS
	DELETE FROM TBL_FACTURAS WHERE Id_Factura = @P_Id_Factura;
GO


--TRANSACCIONES
--INSERT 
CREATE PROCEDURE [dbo].[CRE_TRANSACCION_PR]
	@P_Id_Factura [int],
	@P_Tipo [nvarchar](50),
	@P_Detalle [nvarchar](50),
	@P_Monto [float]

AS
	INSERT INTO [dbo].[TBL_TRANSACCIONES] 
	VALUES(@P_Id_Factura,@P_Tipo,@P_Detalle,@P_Monto);
GO

--RET  BY ID 
CREATE PROCEDURE [dbo].[RET_TRANSACCION_PR]
	 @P_Id_Transaccion [int]
AS
	SELECT Id_Transaccion,Id_Factura,Tipo,Detalle,Monto FROM TBL_TRANSACCIONES WHERE Id_Transaccion = @P_Id_Transaccion;

GO

--RET  BY ID FACTURA
CREATE PROCEDURE [dbo].[RET_TRANSACCION_BY_ID_FACTURA_PR]
	 @P_Id_Factura [int]
AS
	SELECT Id_Transaccion,Id_Factura,Tipo,Detalle,Monto FROM TBL_TRANSACCIONES WHERE Id_Factura = @P_Id_Factura;

GO

--RETRIEVE ALL 
CREATE PROCEDURE [dbo].[RET_ALL_TRANSACCION_PR]
AS
	SELECT Id_Transaccion,Id_Factura,Tipo,Detalle,Monto FROM TBL_TRANSACCIONES;

GO

--UPDATE 
CREATE PROCEDURE [dbo].[UPD_TRANSACCION_PR]
    @P_Id_Transaccion [int],
    @P_Id_Factura [int],
	@P_Tipo [nvarchar](50),
	@P_Detalle [nvarchar](50),
	@P_Monto [float]
AS
	UPDATE [dbo].[TBL_TRANSACCIONES] SET 
	Id_Factura = @P_Id_Factura, 
	Tipo = @P_Tipo, 
	Detalle = @P_Detalle,
	Monto = @P_Monto
	WHERE Id_Transaccion = @P_Id_Transaccion;
GO

--DELETE 
CREATE PROCEDURE [dbo].[DEL_TRANSACCION_PR]
	    @P_Id_Transaccion [int]
AS
	DELETE FROM TBL_TRANSACCIONES WHERE Id_Transaccion = @P_Id_Transaccion;
GO



--CONTRASENNA
--INSERT 
CREATE PROCEDURE [dbo].[CRE_CONTRASENNA_PR]
	@P_Id_Usuario [int],
	@P_Valor [nvarchar](50),
	@P_Fecha_Creacion [datetime]
AS
	INSERT INTO [dbo].[TBL_CONTRASENNAS] 
	VALUES(@P_Id_Usuario,@P_Valor,@P_Fecha_Creacion);
GO

--RET  BY ID 
CREATE PROCEDURE [dbo].[RET_CONTRASENNA_PR]
	@P_Id_Contrasenna [int]
AS
	SELECT Id_Contrasenna,Id_Usuario,Valor,Fecha_Creacion FROM TBL_CONTRASENNAS WHERE Id_Contrasenna = @P_Id_Contrasenna;

GO

--RET BY ID Usuario
CREATE PROCEDURE [dbo].[RET_CONTRASENNA_BY_ID_USUARIO_PR]
	@P_Id_Usuario [int]
AS
	SELECT Id_Contrasenna,Id_Usuario,Valor,Fecha_Creacion FROM TBL_CONTRASENNAS WHERE Id_Usuario = @P_Id_Usuario;

GO

--RETRIEVE ALL 
CREATE PROCEDURE [dbo].[RET_ALL_CONTRASENNA_PR]
AS
	SELECT Id_Contrasenna,Id_Usuario,Valor,Fecha_Creacion FROM TBL_CONTRASENNAS;

GO

--UPDATE 
CREATE PROCEDURE [dbo].[UPD_CONTRASENNA_PR]
	@P_Id_Contrasenna [int],
    @P_Id_Usuario [int],
	@P_Valor [nvarchar](50),
	@P_Fecha_Creacion [datetime]
AS
	UPDATE [dbo].[TBL_CONTRASENNAS] SET 
	Id_Usuario = @P_Id_Usuario, 
	Valor = @P_Valor,
	Fecha_Creacion = @P_Fecha_Creacion
	WHERE Id_Contrasenna = @P_Id_Contrasenna;
GO

--DELETE 
CREATE PROCEDURE [dbo].[DEL_CONTRASENNA_PR]
	@P_Id_Contrasenna [int]
AS
	DELETE FROM TBL_CONTRASENNAS WHERE Id_Contrasenna = @P_Id_Contrasenna;

GO
--SP ROL USUARIO
--INSERT 
CREATE PROCEDURE [dbo].[CRE_ROL_USUARIO_PR]
	@P_Id_Usuario [int],
	@P_Id_Rol [int]
AS
	INSERT INTO [dbo].[TBL_ROL_USUARIO] 
	VALUES(@P_Id_Usuario,@P_Id_Rol);
GO

--RET  BY ID 
CREATE PROCEDURE [dbo].[RET__ROL_USUARIO_PR]
	@P_Id_Usuario [int],
	@P_Id_Rol [int]
AS
	SELECT Id_Usuario,Id_Rol FROM TBL_ROL_USUARIO WHERE Id_Usuario = @P_Id_Usuario AND Id_Rol = @P_Id_Rol;

GO

--RET  BY ID Usuario
CREATE PROCEDURE [dbo].[RET__ROL_USUARIO_BY_ID_USUARIO_PR]
	@P_Id_Usuario [int]
AS
	SELECT Id_Usuario,Id_Rol FROM TBL_ROL_USUARIO WHERE Id_Usuario = @P_Id_Usuario;

GO

--RETRIEVE ALL 
CREATE PROCEDURE [dbo].[RET_ALL_ROL_USUARIO_PR]
AS
	SELECT Id_Usuario,Id_Rol FROM TBL_ROL_USUARIO;

GO

--UPDATE 
CREATE PROCEDURE [dbo].[UPD_ROL_USUARIO_PR]
    @P_Id_Usuario [int],
	@P_Id_Rol [int]
AS
	UPDATE [dbo].[TBL_ROL_USUARIO] SET 
	Id_Usuario = @P_Id_Usuario, 
	Id_Rol = @P_Id_Rol
	WHERE Id_Usuario = @P_Id_Usuario AND Id_Rol = @P_Id_Rol;
GO

--DELETE 
CREATE PROCEDURE [dbo].[DEL_ROL_USUARIO_PR]
	@P_Id_Usuario [int],
	@P_Id_Rol [int]
AS
	DELETE FROM TBL_ROL_USUARIO WHERE Id_Usuario = @P_Id_Usuario AND Id_Rol = @P_Id_Rol;

GO
--LIST OPTION
CREATE PROCEDURE [dbo].[RET_ALL_LIST_OPTION_PR]
AS
	SELECT LIST_ID, LIST_VALUE, LIST_DESC FROM TBL_LIST_OPTIONS;
GO

--CARACTERISTICAS ESPACIO
CREATE PROCEDURE [dbo].[CRE_CARACTERISTICAS_ESPACIO_PR]
	@P_Id_Espacio [int],
	@P_Nombre [nvarchar](50),
	@P_Descripcion [nvarchar](50)
AS
	INSERT INTO [dbo].[TBL_CARACTERISTICAS_ESPACIOS] 
	VALUES(@P_Id_Espacio,@P_Nombre,@P_Descripcion);
GO


CREATE     PROCEDURE [dbo].[RET_CARACTERISTICAS_ESPACIO_PR]
	@P_ID_CARACTERISTICA int
AS
	SELECT Id_Caracteristica, Id_Espacio, Nombre, Descripcion FROM TBL_CARACTERISTICAS_ESPACIOS WHERE Id_Caracteristica = @P_ID_CARACTERISTICA;
GO

CREATE     PROCEDURE [dbo].[RET_CARACTERISTICAS_ESPACIO_BY_ESPACIO_PR]
	@P_ID_ESPACIO int
AS
	SELECT Id_Caracteristica, Id_Espacio, Nombre, Descripcion FROM TBL_CARACTERISTICAS_ESPACIOS WHERE Id_Espacio = @P_ID_ESPACIO;
GO

CREATE     PROCEDURE [dbo].[RET_ALL_CARACTERISTICAS_ESPACIO_PR]
AS
	SELECT Id_Caracteristica, Id_Espacio, Nombre, Descripcion FROM TBL_CARACTERISTICAS_ESPACIOS;
GO

--UPDATE 
CREATE PROCEDURE [dbo].[UPD_CARACTERISTICAS_ESPACIO_PR]
    @P_Id_Caracteristica [int],
	@P_Id_Espacio [int],
	@P_Nombre [nvarchar](50),
	@P_Descripcion [nvarchar](50)
AS
	UPDATE [dbo].[TBL_CARACTERISTICAS_ESPACIOS] SET 
	Nombre = @P_Nombre,
	Descripcion = @P_Descripcion
	WHERE Id_Caracteristica = @P_Id_Caracteristica;
GO

--DELETE 
CREATE PROCEDURE [dbo].[DEL_CARACTERISTICAS_ESPACIOS_PR]
	@P_Id_Caracteristica [int]
AS
	DELETE FROM TBL_CARACTERISTICAS_ESPACIOS WHERE Id_Caracteristica = @P_Id_Caracteristica;
GO


--ESPACIOS
--INSERT 
CREATE PROCEDURE [dbo].[CRE_ESPACIO_PR]
	@P_Id_Propiedad [int],
	@P_Id_Categoria [int],
	@P_Nombre [nvarchar](50),
	@P_Precio [float],
	@P_Estado [nvarchar](50),
	@P_Permite_Reembolso [nvarchar](50),
	@P_Permite_Cancelacion [nvarchar](50),
	@P_Tiempo_Minimo_Previo_Cancelacion [int],
	@P_Tiempo_Minimo_Reservacion [float],
	@P_Mensaje_Reservacion  [nvarchar](400)
	
AS
	INSERT INTO [dbo].[TBL_ESPACIOS] 
	VALUES(@P_Id_Propiedad,@P_Id_Categoria,@P_Nombre,@P_Precio,@P_Estado,@P_Permite_Reembolso,@P_Permite_Cancelacion,@P_Tiempo_Minimo_Previo_Cancelacion,@P_Tiempo_Minimo_Reservacion,@P_Mensaje_Reservacion);
GO

--RET  BY ID 
CREATE PROCEDURE [dbo].[RET_ESPACIO_PR]
	@P_Id_Espacio [int]
AS
	SELECT * FROM TBL_ESPACIOS WHERE Id_Espacio = @P_Id_Espacio;

GO

--RET ALL HORARIOS BY ID ESPACIO
CREATE PROCEDURE [dbo].[RET_ALL_HORARIOS_ID_ESPACIO_PR]
	@P_Id_ESPACIO [int]
AS
	SELECT * FROM TBL_HORARIOS WHERE Id_Espacio = @P_Id_ESPACIO;

GO

--RETRIEVE ALL 
CREATE PROCEDURE [dbo].[RET_ALL_ESPACIOS_PR]
AS
	SELECT * FROM TBL_ESPACIOS;

GO

--UPDATE 
CREATE PROCEDURE [dbo].[UPD_ESPACIO_PR]
    	@P_Id_Espacio [int],
	@P_Id_Categoria [int],
	@P_Id_Propiedad [int],
	@P_Nombre [nvarchar](50),
	@P_Precio [float],
	@P_Estado [nvarchar](50),
	@P_Permite_Reembolso [nvarchar](50),
	@P_Permite_Cancelacion [nvarchar](50),
	@P_Tiempo_Minimo_Previo_Cancelacion [int],
	@P_Tiempo_Minimo_Reservacion [float],
	@P_Mensaje_Reservacion  [nvarchar](400)
AS
	UPDATE [dbo].[TBL_ESPACIOS] SET 
	Nombre = @P_Nombre,
	Precio = @P_Precio,
	Estado = @P_Estado,
	Permite_Reembolso = @P_Permite_Reembolso,
	Permite_Cancelacion = @P_Permite_Cancelacion,
	Tiempo_Minimo_Previo_Cancelacion = @P_Tiempo_Minimo_Previo_Cancelacion,
	Tiempo_Minimo_Reservacion = @P_Tiempo_Minimo_Reservacion,
	Mensaje_Reservacion = @P_Mensaje_Reservacion

	WHERE Id_Espacio = @P_Id_Espacio;
GO

--DELETE 
CREATE PROCEDURE [dbo].[DEL_ESPACIO_PR]
	@P_Id_Espacio [int]
AS
	DELETE FROM TBL_ESPACIOS WHERE Id_Espacio = @P_Id_Espacio;

GO

--HORARIOS
--INSERT 
CREATE PROCEDURE [dbo].[CRE_HORARIO_PR]
	@P_Id_Espacio [int],
	@P_Dia_Semana [nvarchar](50),
	@P_Hora_Inicio [datetime],
	@P_Hora_Fin [datetime]
AS
	INSERT INTO [dbo].[TBL_HORARIOS] 
	VALUES(@P_Id_Espacio,@P_Dia_Semana,@P_Hora_Inicio,@P_Hora_Fin);
GO

--RET HORARIO BY ID ESPACIO AND DIA SEMANA
CREATE PROCEDURE [dbo].[RET_HORARIO_BY_ID_ESPACIO_DIA_SEMANA_PR]
	@P_Id_Espacio [int],
	@P_Dia_Semana [nvarchar](50)
AS
	SELECT * FROM TBL_HORARIOS WHERE Id_Espacio = @P_Id_Espacio AND Dia_Semana = @P_Dia_Semana;

GO

--RET HORARIO BY ID 
CREATE PROCEDURE [dbo].[RET_HORARIO_PR]
	@P_Id_Horario [int]
AS
	SELECT * FROM TBL_HORARIOS WHERE Id_Horario = @P_Id_Horario;

GO
USE [coworkSpaces]
GO





--RETRIEVE ALL 
CREATE PROCEDURE [dbo].[RET_ALL_HORARIOS_PR]
AS
	SELECT * FROM TBL_HORARIOS;

GO

--UPDATE 
CREATE PROCEDURE [dbo].[UPD_HORARIO_PR]
    @P_Id_Horario [int],
	@P_Id_Espacio [int],
	@P_Dia_Semana [nvarchar](50),
	@P_Hora_Inicio [datetime],
	@P_Hora_Fin [datetime]
AS
	UPDATE [dbo].[TBL_HORARIOS] SET 
	Dia_Semana = @P_Dia_Semana,
	Hora_Inicio= @P_Hora_Inicio,
	Hora_Fin = @P_Hora_Fin
	WHERE Id_Horario = @P_Id_Horario;
GO

--DELETE 
CREATE PROCEDURE [dbo].[DEL_HORARIO_PR]
	@P_Id_Horario [int]
AS
	DELETE FROM TBL_HORARIOS WHERE Id_Horario = @P_Id_Horario;

GO

--IMPUESTOS
--INSERT 
CREATE PROCEDURE [dbo].[CRE_IMPUESTO_PR]
	@P_Nombre [nvarchar](50),
	@P_Valor [float]
AS
	INSERT INTO [dbo].[TBL_IMPUESTOS] 
	VALUES(@P_Nombre,@P_Valor);
GO

--RET IMPUESTO BY ID 
CREATE PROCEDURE [dbo].[RET_IMPUESTO_BY_ID_PR]
	@P_Id_Impuesto [int]
AS
	SELECT * FROM TBL_IMPUESTOS WHERE Id_Impuesto = @P_Id_Impuesto;

GO


--RETRIEVE ALL 
CREATE PROCEDURE [dbo].[RET_ALL_IMPUESTOS_PR]
AS
	SELECT * FROM TBL_IMPUESTOS;

GO

--UPDATE 
CREATE PROCEDURE [dbo].[UPD_IMPUESTO_PR]
    @P_Id_Impuesto [int],
	@P_Nombre [nvarchar](50),
	@P_Valor [float]
AS
	UPDATE [dbo].[TBL_IMPUESTOS] SET 
	Nombre = @P_Nombre,
	Valor = @P_Valor
	WHERE Id_Impuesto = @P_Id_Impuesto;
GO

--DELETE 
CREATE PROCEDURE [dbo].[DEL_IMPUESTO_PR]
	@P_Id_Impuesto [int]
AS
	DELETE FROM TBL_IMPUESTOS WHERE Id_Impuesto = @P_Id_Impuesto;

GO


--TABLA INTERMEDIA DOCUMENTOS ESPACIO
--GUARDA EL ID DEL DOCUMENTO(FOTO) PARA RELACIONARLO CON UN ESPACIO
CREATE   PROCEDURE [dbo].[CRE_DOCUMENTO_ESPACIO_PR]

    @P_Id_Documento int,
	@P_Id_Espacio int
AS
	INSERT INTO [dbo].[TBL_DOCUMENTOS_ESPACIO] VALUES(@P_Id_Documento,@P_Id_Espacio);
GO

CREATE     PROCEDURE [dbo].[RET_ALL_DOCUMENTOS_ESPACIO_PR]
AS
	SELECT Id_Documento_Espacio, Id_Documento, Id_Espacio FROM TBL_DOCUMENTOS_ESPACIO;
GO

CREATE     PROCEDURE [dbo].[RET_DOCUMENTO_ESPACIO_PR]
	@P_Id_Documento_Espacio int
AS
	SELECT Id_Documento_Espacio, Id_Documento, Id_Espacio FROM TBL_DOCUMENTOS_ESPACIO WHERE Id_Documento_Espacio = @P_Id_Documento_Espacio;
GO

CREATE     PROCEDURE [dbo].[UPD_DOCUMENTO_ESPACIO_PR]
	@P_Id_Documento_Espacio int,
	@P_Id_Documento int, 
	@P_Id_Espacio int
AS
	UPDATE [dbo].[TBL_DOCUMENTOS_ESPACIO] SET Id_Documento=@P_Id_Documento,
	Id_Espacio = @P_Id_Espacio
	WHERE Id_Documento_Espacio = @P_Id_Documento_Espacio;
GO


CREATE     PROCEDURE [dbo].[DEL_DOCUMENTO_ESPACIO_PR]
	@P_Id_Documento_Espacio int
AS
	DELETE FROM TBL_DOCUMENTOS_ESPACIO WHERE Id_Documento_Espacio = @P_Id_Documento_Espacio;
GO

--RESERVACION
--INSERT 
CREATE PROCEDURE [dbo].[CRE_RESERVACION_PR]
	@P_Id_Usuario [int],
	@P_Id_Espacio [nvarchar](50),
	@P_Fecha [datetime],
	@P_Hora_Entrada [time](7),
	@P_Hora_Salida [time](7),
	@P_Calificacion_Usuario [int],
@P_Calificacion_Propietario [int],
@P_Calificacion_Propiedad [int],
@P_Monto [float],
@P_Estado [nvarchar](50)
	
AS
	INSERT INTO [dbo].[TBL_RESERVACION] 
	VALUES(@P_Id_Usuario,@P_Id_Espacio,@P_Fecha,@P_Hora_Entrada,@P_Hora_Salida,@P_Calificacion_Usuario,@P_Calificacion_Propietario,@P_Calificacion_Propiedad,@P_Monto,@P_Estado);
GO

--RET  BY ID 
CREATE PROCEDURE [dbo].[RET_RESERVACION_PR]
	@P_Id_Reservacion [int]
AS
	SELECT * FROM TBL_RESERVACION WHERE Id_Reservacion = @P_Id_Reservacion;

GO

--RET  BY USUARIO
CREATE PROCEDURE [dbo].[RET_RESERVACION_BY_USUARIO_PR]
	@P_Id_Usuario [int]
AS
	SELECT * FROM TBL_RESERVACION WHERE Id_Usuario = @P_Id_Usuario;

GO

--RET  BY ESPACIO
CREATE PROCEDURE [dbo].[RET_RESERVACION_BY_ESPACIO_PR]
	@P_Id_Espacio [int]
AS
	SELECT * FROM TBL_RESERVACION WHERE Id_Espacio = @P_Id_Espacio;

GO
--RET  BY FECHA
CREATE PROCEDURE [dbo].[RET_RESERVACION_BY_FECHA_PR]
	@P_Fecha [int]
AS
	SELECT * FROM TBL_RESERVACION WHERE Fecha = @P_Fecha;

GO



--RETRIEVE ALL 
CREATE PROCEDURE [dbo].[RET_ALL_RESERVACIONES_PR]
AS
	SELECT * FROM TBL_RESERVACION;

GO

--UPDATE 
CREATE PROCEDURE [dbo].[UPD_RESERVACION_PR]
    	@P_Id_Reservacion [int],
	@P_Id_Usuario [int],
	@P_Id_Espacio [nvarchar](50),
	@P_Fecha [datetime],
	@P_Hora_Entrada [time](7),
	@P_Hora_Salida [time](7),
	@P_Calificacion_Usuario [int],
@P_Calificacion_Propietario [int],
@P_Calificacion_Propiedad [int],
@P_Monto [float],
@P_Estado [nvarchar](50)
AS
	UPDATE [dbo].[TBL_RESERVACION] SET 
	Hora_Entrada = @P_Hora_Entrada,
	Hora_Salida= @P_Hora_Salida,
	Calificacion_Usuario = @P_Calificacion_Usuario,
	Calificacion_Propietario = @P_Calificacion_Propietario,
	Calificacion_Propiedad = @P_Calificacion_Propiedad,
	Monto = @P_Monto,
	Estado = @P_Estado

	WHERE Id_Reservacion = @P_Id_Reservacion;
GO

--DELETE 
CREATE PROCEDURE [dbo].[DEL_RESERVACION_PR]
	@P_Id_Reservacion [int]
AS
	DELETE FROM TBL_RESERVACION WHERE Id_Reservacion = @P_Id_Reservacion;

GO



/****** Object:  StoredProcedure [dbo].[CRE_CATEGORIA_PR]    Script Date: 27/3/2021 10:28:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- CREATE CATEGORIA
CREATE     PROCEDURE [dbo].[CRE_CATEGORIA_PR]
	@P_ID_CATEGORIA int,
	@P_NOMBRE varchar(50)

AS
	INSERT INTO [dbo].[TBL_CATEGORIAS] VALUES(@P_NOMBRE);
GO
/****** Object:  StoredProcedure [dbo].[CRE_DOCUMENTO_PR]    Script Date: 27/3/2021 10:28:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[CRE_DOCUMENTO_PR]
	@P_ID_PROPIEDAD int,
    @P_URL varchar(150),
	@P_TIPO varchar(50),
	@P_NOMBRE varchar(50)

AS
	INSERT INTO [dbo].[TBL_DOCUMENTOS] VALUES(@P_ID_PROPIEDAD,@P_URL,@P_TIPO,@P_NOMBRE);
GO

USE [coworkSpaces]
GO
/****** Object:  StoredProcedure [dbo].[UPD_DOCUMENTO_PR]    Script Date: 4/2/2021 10:47:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE    PROCEDURE [dbo].[UPD_DOCUMENTO_PR]
	@P_ID_DOCUMENTO int,
	@P_ID_PROPIEDAD int,
    @P_URL varchar(150),
	@P_TIPO varchar(50),
	@P_NOMBRE varchar(50)

AS
	UPDATE [dbo].[TBL_DOCUMENTOS] 
	SET Id_Propiedad = @P_ID_PROPIEDAD,
	URL=@P_URL,
	Tipo = @P_TIPO,
	Nombre = @P_NOMBRE
	WHERE Id_Documento = @P_ID_DOCUMENTO;



/****** Object:  StoredProcedure [dbo].[CRE_PARAMETRO_PR]    Script Date: 27/3/2021 10:28:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE     PROCEDURE [dbo].[CRE_PARAMETRO_PR]
	@P_ID_PARAMETRO int,
	@P_NOMBRE varchar(50),
	@P_VALOR varchar(MAX)

AS
	INSERT INTO [dbo].[TBL_PARAMETROS] VALUES(@P_NOMBRE,@P_VALOR);
GO
/****** Object:  StoredProcedure [dbo].[CRE_PROPIEDAD_PR]    Script Date: 27/3/2021 10:28:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE       PROCEDURE [dbo].[CRE_PROPIEDAD_PR]
	@P_ID_PROPIEDAD int,
	@P_ID_USUARIO int,
	@P_NOMBRE varchar(50),
	@P_ESTADO varchar(50),
	@P_DESCRIPCION varchar(MAX),
	@P_LATITUD float,
	@P_LONGITUD float

AS
	INSERT INTO [dbo].[TBL_PROPIEDADES] VALUES(@P_ID_USUARIO,@P_NOMBRE,@P_ESTADO,@P_DESCRIPCION,@P_LATITUD,@P_LONGITUD);
GO
/****** Object:  StoredProcedure [dbo].[CRE_USUARIO_PR]    Script Date: 27/3/2021 10:28:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/****** Object:  StoredProcedure [dbo].[DEL_CATEGORIA_PR]    Script Date: 27/3/2021 10:28:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE     PROCEDURE [dbo].[DEL_CATEGORIA_PR]
	@P_ID_CATEGORIA int
AS
	DELETE FROM TBL_CATEGORIAS 	WHERE Id_Categoria=@P_ID_CATEGORIA;
GO
/****** Object:  StoredProcedure [dbo].[DEL_CONTRASENNA_PR]    Script Date: 27/3/2021 10:28:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/****** Object:  StoredProcedure [dbo].[DEL_DOCUMENTO_PR]    Script Date: 27/3/2021 10:28:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE     PROCEDURE [dbo].[DEL_DOCUMENTO_PR]
	@P_ID_DOCUMENTO int
AS
	DELETE FROM TBL_DOCUMENTOS WHERE Id_Documento=@P_ID_DOCUMENTO;
GO
/****** Object:  StoredProcedure [dbo].[DEL_PARAMETRO_PR]    Script Date: 27/3/2021 10:28:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE     PROCEDURE [dbo].[DEL_PARAMETRO_PR]
	@P_ID_PARAMETRO int
AS
	DELETE FROM TBL_PARAMETROS WHERE Id_Parametro=@P_ID_PARAMETRO ;
GO
/****** Object:  StoredProcedure [dbo].[DEL_PROPIEDAD_PR]    Script Date: 27/3/2021 10:28:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--DELETE PROPIEDAD
CREATE     PROCEDURE [dbo].[DEL_PROPIEDAD_PR]
	@P_ID_PROPIEDAD int
AS
	DELETE FROM TBL_PROPIEDADES WHERE Id_Propiedad=@P_ID_PROPIEDAD;
GO

/****** Object:  StoredProcedure [dbo].[RET_ALL_CATEGORIAS_PR]    Script Date: 27/3/2021 10:28:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE     PROCEDURE [dbo].[RET_ALL_CATEGORIAS_PR]
AS
	SELECT Id_Categoria,Nombre FROM TBL_CATEGORIAS;
GO
/****** Object:  StoredProcedure [dbo].[RET_ALL_CONTRASENNA_PR]    Script Date: 27/3/2021 10:28:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


/****** Object:  StoredProcedure [dbo].[RET_ALL_DOCUMENTOS_PR]    Script Date: 27/3/2021 10:28:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE     PROCEDURE [dbo].[RET_ALL_DOCUMENTOS_PR]
AS
	SELECT Id_Documento, Id_Propiedad, URL, Tipo, Nombre FROM TBL_DOCUMENTOS;
GO

/****** Object:  StoredProcedure [dbo].[RET_ALL_PARAMETROS_PR]    Script Date: 27/3/2021 10:28:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE     PROCEDURE [dbo].[RET_ALL_PARAMETROS_PR]
AS
	SELECT Id_Parametro, Nombre, Valor FROM TBL_PARAMETROS;
GO
/****** Object:  StoredProcedure [dbo].[RET_ALL_PROPIEDADES_PR]    Script Date: 27/3/2021 10:28:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE     PROCEDURE [dbo].[RET_ALL_PROPIEDADES_PR]
AS
	SELECT Id_Propiedad, Id_Usuario, Nombre, Estado, Descripcion, Latitud, Longitud FROM TBL_PROPIEDADES;
GO
/****** Object:  StoredProcedure [dbo].[RET_ALL_ROL_USUARIO_PR]    Script Date: 27/3/2021 10:28:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


/****** Object:  StoredProcedure [dbo].[RET_CATEGORIA_PR]    Script Date: 27/3/2021 10:28:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE    PROCEDURE [dbo].[RET_CATEGORIA_PR]
	@P_ID_CATEGORIA int
AS
	SELECT  Id_Categoria, Nombre FROM TBL_CATEGORIAS WHERE Id_Categoria = @P_ID_CATEGORIA;
GO
/****** Object:  StoredProcedure [dbo].[RET_CONTRASENNA_BY_ID_USUARIO_PR]    Script Date: 27/3/2021 10:28:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


/****** Object:  StoredProcedure [dbo].[RET_DOCUMENTO_PR]    Script Date: 27/3/2021 10:28:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE     PROCEDURE [dbo].[RET_DOCUMENTO_PR]
	@P_ID_DOCUMENTO int
AS
	SELECT Id_Documento, Id_Propiedad, URL, Tipo, Nombre FROM TBL_DOCUMENTOS WHERE Id_Documento = @P_ID_DOCUMENTO;
GO
/****** Object:  StoredProcedure [dbo].[RET_PARAMETRO_PR]    Script Date: 27/3/2021 10:28:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE     PROCEDURE [dbo].[RET_PARAMETRO_PR]
	@P_ID_PARAMETRO int
AS
	SELECT  Id_Parametro, Nombre, Valor FROM TBL_PARAMETROS WHERE Id_Parametro = @P_ID_PARAMETRO;
GO
/****** Object:  StoredProcedure [dbo].[RET_PROPIEDAD_PR]    Script Date: 27/3/2021 10:28:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--RET PROPIEDAD BY ID
CREATE     PROCEDURE [dbo].[RET_PROPIEDAD_PR]
	@P_ID_PROPIEDAD int
AS
	SELECT Id_Propiedad, Id_Usuario, Nombre, Estado, Descripcion, Latitud, Longitud FROM TBL_PROPIEDADES WHERE Id_Propiedad = @P_ID_PROPIEDAD;
GO
/****** Object:  StoredProcedure [dbo].[RET_USUARIO_PR]    Script Date: 27/3/2021 10:28:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


/****** Object:  StoredProcedure [dbo].[UPD_CATEGORIA_PR]    Script Date: 27/3/2021 10:28:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE     PROCEDURE [dbo].[UPD_CATEGORIA_PR]
	@P_ID_CATEGORIA int,
	@P_NOMBRE varchar(50)
AS
	UPDATE [dbo].[TBL_CATEGORIAS] SET Nombre=@P_NOMBRE
	WHERE Id_Categoria=@P_ID_CATEGORIA;
GO

/****** Object:  StoredProcedure [dbo].[UPD_ESTADO_PROPIEDAD_PR]    Script Date: 27/3/2021 10:28:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- UPDATE ESTADO DE LA PROPIEDAD
CREATE     PROCEDURE [dbo].[UPD_ESTADO_PROPIEDAD_PR]
	@P_ID_PROPIEDAD int,
	@P_ESTADO varchar(50)
AS
	UPDATE [dbo].[TBL_PROPIEDADES] SET Estado=@P_ESTADO	WHERE Id_Propiedad=@P_ID_PROPIEDAD;
GO
/****** Object:  StoredProcedure [dbo].[UPD_PARAMETRO_PR]    Script Date: 27/3/2021 10:28:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE     PROCEDURE [dbo].[UPD_PARAMETRO_PR]
	@P_ID_PARAMETRO int,
	@P_NOMBRE varchar(50),
	@P_VALOR varchar(MAX)
AS
	UPDATE [dbo].[TBL_PARAMETROS] SET Nombre=@P_NOMBRE, Valor = @P_VALOR
	WHERE Id_Parametro = @P_ID_PARAMETRO;
GO
/****** Object:  StoredProcedure [dbo].[UPD_PROPIEDAD_PR]    Script Date: 27/3/2021 10:28:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- UPDATE PROPIEDAD
CREATE PROCEDURE [dbo].[UPD_PROPIEDAD_PR]
	@P_ID_PROPIEDAD int,
	@P_ID_USUARIO varchar(50),
	@P_NOMBRE varchar(50),
	@P_ESTADO varchar(50),
	@P_DESCRIPCION varchar(MAX),
	@P_LATITUD float,
	@P_LONGITUD float
AS
	UPDATE [dbo].[TBL_PROPIEDADES] SET Nombre=@P_NOMBRE, Estado=@P_ESTADO, Descripcion=@P_DESCRIPCION, Latitud=@P_LATITUD,
	Longitud = @P_LONGITUD
	WHERE Id_Propiedad=@P_ID_PROPIEDAD;
GO

--SOLICITUDES
--INSERT 
CREATE PROCEDURE [dbo].[CRE_SOLICITUD_PR]
	@P_Id_Usuario [int],
	@P_Revisada [nvarchar](50),
	@P_Resultado [nvarchar](50)
AS
	INSERT INTO [dbo].[TBL_SOLICITUDES] 
	VALUES(@P_Id_Usuario,@P_Revisada,@P_Resultado);
GO
CREATE PROCEDURE [dbo].[RET_ALL_SOLICITUDES]
AS
	select s.Id_Solicitud, s.Id_Usuario, s.Resultado, s.Revisada from TBL_SOLICITUDES as s
GO
CREATE PROCEDURE [dbo].[RET_SOLICITUDES_PR]
	@P_ID_SOLICITUD int
AS
	SELECT Id_Solicitud, Id_Usuario, Revisada, Resultado FROM TBL_SOLICITUDES WHERE Id_Solicitud = @P_ID_SOLICITUD;
GO

--UPDATE 
CREATE PROCEDURE [dbo].[UPD_SOLICITUDE_PR]
    @P_Id_Solicitud [int],
	@P_Id_Usuario [int],
	@P_Revisada [nvarchar](20),
	@P_Resultado [nvarchar](20)
AS
	UPDATE [dbo].[TBL_SOLICITUDES] SET 
	Revisada = @P_Revisada,
	Resultado = @P_Resultado
	WHERE Id_Solicitud = @P_Id_Solicitud;
GO


--SP MENSAJES
--INSERT 
CREATE PROCEDURE [dbo].[CRE_MENSAJE_PR]
	@P_Id_Usuario_Emisor [int],
	@P_Id_Usuario_Receptor [int],
	@P_Texto [nvarchar](MAX),
	@P_Fecha [datetime]
AS
	INSERT INTO [dbo].[TBL_MENSAJES] 
	VALUES(@P_Id_Usuario_Emisor,@P_Id_Usuario_Receptor,@P_Texto,@P_Fecha);
GO

--RET BY ID USUARIO
CREATE PROCEDURE [dbo].[RET_MENSAJE_BY_USUARIO_PR]
	@P_Id_Usuario_Emisor [int],
	@P_Id_Usuario_Receptor [int]
AS
	SELECT Id_Mensaje,Id_Usuario_Emisor,Id_Usuario_Receptor,Texto,Fecha FROM TBL_MENSAJES WHERE Id_Usuario_Emisor = @P_Id_Usuario_Emisor OR Id_Usuario_Receptor = @P_Id_Usuario_Receptor;

GO

--RETRIEVE ALL 
CREATE PROCEDURE [dbo].[RET_ALL_MENSAJE_PR]
AS
	SELECT Id_Mensaje,Id_Usuario_Emisor,Id_Usuario_Receptor,Texto,Fecha FROM TBL_MENSAJES;

GO

--DELETE 
CREATE PROCEDURE [dbo].[DEL_MENSAJE_PR]
	@P_Id_Usuario_Emisor [int],
	@P_Id_Usuario_Receptor [int]
AS
	DELETE FROM TBL_MENSAJES  WHERE Id_Usuario_Emisor = @P_Id_Usuario_Emisor AND Id_Usuario_Receptor = @P_Id_Usuario_Receptor;

GO




