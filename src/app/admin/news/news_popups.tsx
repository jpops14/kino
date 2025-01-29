import prisma from "@/app/_db/db";
import { handlePrismaError } from "@/app/_db/utils";
import React from "react";
import NewsEditor from "./news_editor";

const NewsPopups = async ({ searchParams }: { searchParams: URLSearchParams }) => {

    const news = searchParams.get("news");
    
    const editNews = news ? await prisma.news.findUnique({ where: { id: parseInt(news) } }).catch(handlePrismaError) : null;

    return (
        <React.Fragment>
            {news !== null ? <NewsEditor newsData={editNews} /> : null}
        </React.Fragment>
    )
}

export default NewsPopups;