function markTerms(content, term) {
    if (term != "") {
        let replace = `<mark>${term}</mark>`
        return content.replaceAll(term, replace)
    } else {
        return content
    }
}

function transformDate(date) {
    return new Date(Date.parse(date)).toLocaleDateString('es-co', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        separator: '-'
    });
}

function beautyContent(content) {
    content = content.replaceAll("\t", "<pre>")
    return content.replaceAll("\n", "</br>")
}

function formatEmail(email) {
    let stringFormat =
        `
<div class="container px-5">
    <!--subject and tag -->
    <div class = "flex pb-2" >
        <div class="text-2xl font-bold pr-4 mt-10">${(email.subject)=="" ? "(no subject)" : email.subject}</div>
        <div class = "bg-violet-500 text-center text-white px-2 py-1 rounded-full mt-10">${email.person} / ${email.email_tag}</div>
    </div>
    <!-- end subject and tag -->

    <!-- from, to and date -->
    <div class="flex flex-col py-7">
        <div class="flex">
            <div class="font-bold text-base text-black">${email.from}</div>
            <div class="ml-auto font-bold text-pink-500">${(email.date)}</div>
        </div>
        <div class="flex mt-2">
            <div class="font-bold text-stone-700">To: ${email.to}</div>
        </div>
    </div>
    <!-- end from, to and date -->
    <!-- content -->
    <div class="pt-4">
        <div class="text-black"> ${beautyContent(email.content)} </div>
    </div>
    <!-- end content -->
</div>
`
    return stringFormat
}

export {
    markTerms,
    transformDate,
    formatEmail
}