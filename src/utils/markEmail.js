function markTerms(content, term) {
    if (term != "") {
        let replace = `<mark>${term}</mark>`
        return content.replaceAll(term, replace)
    } else {
        return content
    }
}

function transformDate(date) {
    return new Date(Date.parse(date)).toLocaleDateString('es-CO', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        separator: '-'
    });
}

function formatEmail(email) {
    let stringFormat =
        `
<div class="container px-5">
    <!--subject and tag -->
    <div class="flex pb-2">
        <div class="text-xl font-bold pr-4">${email.subject}</div>
        <div class="bg-blue-500 text-center text-white px-1 py-1 rounded-full">${email.person} / ${email.email_tag}</div >
    </div>
    <!-- end subject and tag -->

    <!-- from, to and date -->
    <div class="flex flex-col py-7">
        <div class="flex">
            <div class="font-bold text-base text-black-700">${email.from}</div>
            <div class="ml-auto font-bold text-gray-300">${transformDate(email.date)}</div>
        </div>
        <div class="flex mt-2">
            <div class="font-bold text-gray-300">To: ${email.to}</div>
        </div>
    </div>
    <!-- end from, to and date -->
    <div>
        <div> ${email.content} </div>
    </div>
</div>
`
    return stringFormat
}

export {
    markTerms,
    transformDate,
    formatEmail
}