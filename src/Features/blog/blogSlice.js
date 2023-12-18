import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    blogs: [
        { 
            id: nanoid(),
            date: new Date().toISOString(),
            title: 'نست جی اس (NestJS)',
            content: `نکست جی اس
            همونطور که گفتم، یکی از محاسن ریکت این بود که هر قابلیتی که بخوایم به پروژمون اضافه کنیم براحتی یه پکیج براش پیدا میشه تا جایی که الان وقتی میخوایم یه پروژه ریکتی استارت بزنیم نیاز به نصب پیکیج های متعددی داریم .
            
            این دوست جدیدمون خیلی از این فیچرهای مهم رو داخل خودش داره بدون نیاز به نصب هیچ پکیج  خاص، با عملکرد بهتر و پرفرمنس بالاتر(روتینگ – استایلینگ -  اعتبارسنجی و ...)
            
            یکی از شاخصه های پروژه های ریکتی سرعت بالای اوناست، هر تغییری در صفحه بخواد اتفاق بیفته ، بدون ریلود مجدد فقط المان مورد نظر ما دیتای جدید رو میگیره و این رو مدیون منطق خودش برای انجام عملیات آنی هست تا بتونه یک سینگل پیج اپلیکیشن یا وب اپلیکیشن تک صفحه ای بسازه.
            
            تا وقتی که بخوایم وب اپلیکیشن های کوچیک و بزرگ و کاربر محور طراحی کنیم هیچ مشکلی نیست ولی ریکت اونقدر محبوب شده که برای طراحی وبسایت های بزرگ تجاری هم ازش استفاده میشه که تا حد زیادی SEO براشون مهمه یعنی باید توی موتورهای جستجو براحتی پیدا بشن.
            
            چون ریکت عملیات رندر و تازه سازی صفحه رو بدون ریلود انجام میده، در لحظه اول لود صفحه هیچ دیتایی رو به خزنده های موتور جستجو نشون نمیده (البته این چالشیه که همه تکنولوژی های SPA دارن)`,
            user: 1
        }
    ]
}

const blogsSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {
        blogAdded: {
            reducer(state, action) {
                state.blogs.push(action.payload)
            },
            prepare(title, content, userId) {
                // Complex Logix
                return {
                    payload: {
                        id: nanoid(),
                        date: new Date().toISOString(),
                        title,
                        content,
                        user: userId
                    }
                }
            }
        },
        blogUpdated: (state, action) => {
            const { id, title, content } = action.payload;

            const existingBlog = state.blogs.find(blog => blog.id === id);

            if (existingBlog) {
                existingBlog.title = title;
                existingBlog.content = content;
            }
        },
        blogDeleted: (state, action) => {
            const { id } = action.payload;
            state.blogs = state.blogs.filter(blog => blog.id !== id);
        }
    }
});

export const selectAllBlogs = (state) => state.blogs.blogs;
export const selectBlogById = (state, blogId) => 
    state.blogs.blogs.find(blog => blog.id === blogId);

export const { blogAdded, blogUpdated, blogDeleted } = blogsSlice.actions;

export default blogsSlice.reducer;